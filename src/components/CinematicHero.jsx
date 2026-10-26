import React, { useEffect, useRef, useCallback } from 'react';
import { ArrowRight, Search, ShieldCheck, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';

const TOTAL_FRAMES = 300;
const FRAME_PREFIX = '/frames/ezgif-frame-';

export default function CinematicHero({ onOpenReport, onBrowseItems }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const heroHeaderRef = useRef(null);
  const hudLabelRef = useRef(null);
  const hudPercentRef = useRef(null);
  const hudFillRef = useRef(null);
  const scrollHintRef = useRef(null);

  const imagesRef = useRef(new Array(TOTAL_FRAMES));
  const targetFrameRef = useRef(0);
  const currentDrawnFrameRef = useRef(-1);
  const rafIdRef = useRef(null);

  // Helper to format frame path: index 0 -> /frames/ezgif-frame-001.jpg
  const getFrameUrl = (index) => {
    const num = String(index + 1).padStart(3, '0');
    return `${FRAME_PREFIX}${num}.jpg`;
  };

  // Direct, reliable canvas draw function
  const renderFrame = useCallback((frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Ensure index is within range [0, 299]
    const targetIdx = Math.max(0, Math.min(TOTAL_FRAMES - 1, frameIndex));

    // Get image: either exact target or nearest available loaded frame
    let img = imagesRef.current[targetIdx];
    let actualDrawnIdx = targetIdx;

    if (!img || !img.complete || img.naturalWidth === 0) {
      // Find nearest loaded frame in sequence
      let minDiff = Infinity;
      let closest = -1;
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        const candidate = imagesRef.current[i];
        if (candidate && candidate.complete && candidate.naturalWidth > 0) {
          const diff = Math.abs(i - targetIdx);
          if (diff < minDiff) {
            minDiff = diff;
            closest = i;
          }
        }
      }
      if (closest !== -1) {
        img = imagesRef.current[closest];
        actualDrawnIdx = closest;
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) {
      return;
    }

    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const targetW = Math.round(rect.width * dpr);
    const targetH = Math.round(rect.height * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const canvasW = rect.width;
    const canvasH = rect.height;
    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;

    const imgRatio = imgW / imgH;
    const canvasRatio = canvasW / canvasH;

    let drawW, drawH, drawX, drawY;

    if (canvasRatio > imgRatio) {
      drawW = canvasW;
      drawH = canvasW / imgRatio;
      drawX = 0;
      drawY = (canvasH - drawH) / 2;
    } else {
      drawH = canvasH;
      drawW = canvasH * imgRatio;
      drawX = (canvasW - drawW) / 2;
      drawY = 0;
    }

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    ctx.restore();

    currentDrawnFrameRef.current = actualDrawnIdx;
  }, []);

  // Preload all 300 sequential frames efficiently
  useEffect(() => {
    let active = true;

    const loadSingleImage = (idx) => {
      if (imagesRef.current[idx]) return Promise.resolve(imagesRef.current[idx]);
      return new Promise((resolve) => {
        const img = new Image();
        img.src = getFrameUrl(idx);
        img.onload = () => {
          if (!active) return resolve(img);
          imagesRef.current[idx] = img;

          // If this is frame 0, paint it immediately
          if (idx === 0) {
            renderFrame(0);
          }

          // If current scroll target matches or needs updating
          if (targetFrameRef.current === idx || currentDrawnFrameRef.current === -1) {
            renderFrame(targetFrameRef.current);
          }
          resolve(img);
        };
        img.onerror = () => {
          resolve(null);
        };
      });
    };

    // Priority 1: Frame 0 (first) and Frame 299 (last)
    loadSingleImage(0).then(() => {
      if (!active) return;
      loadSingleImage(TOTAL_FRAMES - 1);

      // Priority 2: Next 25 frames for immediate smooth start
      for (let i = 1; i <= 25; i++) {
        loadSingleImage(i);
      }

      // Priority 3: Strategic keyframes (every 5th frame) throughout video
      for (let i = 30; i < TOTAL_FRAMES - 1; i += 5) {
        loadSingleImage(i);
      }

      // Priority 4: All remaining frames in sequence
      for (let i = 1; i < TOTAL_FRAMES - 1; i++) {
        if (!imagesRef.current[i]) {
          loadSingleImage(i);
        }
      }
    });

    return () => {
      active = false;
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [renderFrame]);

  // Handle bidirectional scroll scrubbing
  useEffect(() => {
    const updateScrollState = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollableDist = rect.height - windowHeight;

      if (scrollableDist <= 0) return;

      // Scrolled distance from top of container
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableDist));

      // Calculate frame index [0, 299]
      const frameIdx = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(progress * (TOTAL_FRAMES - 1))));
      targetFrameRef.current = frameIdx;

      // Render to canvas directly on scroll
      renderFrame(frameIdx);

      // Update HUD elements directly in DOM (avoids React re-render lag)
      if (hudLabelRef.current) {
        hudLabelRef.current.textContent = `Campus Cinematic Scrub • Frame ${frameIdx + 1} / ${TOTAL_FRAMES}`;
      }
      if (hudPercentRef.current) {
        hudPercentRef.current.textContent = `${Math.round(progress * 100)}%`;
      }
      if (hudFillRef.current) {
        hudFillRef.current.style.width = `${progress * 100}%`;
      }
      if (scrollHintRef.current) {
        scrollHintRef.current.textContent = progress > 0.96 ? 'Continue to Directory' : 'Scroll down to travel through campus';
      }

      // Fade out hero title card cleanly as video scrubs forward
      if (heroHeaderRef.current) {
        const opacity = Math.max(0, 1 - progress * 3.5);
        heroHeaderRef.current.style.opacity = opacity;
        heroHeaderRef.current.style.transform = `translateY(${-progress * 50}px)`;
        heroHeaderRef.current.style.pointerEvents = progress > 0.3 ? 'none' : 'auto';
      }
    };

    const onScroll = () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null;
        updateScrollState();
      });
    };

    const onResize = () => {
      updateScrollState();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    // Initial sync
    updateScrollState();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [renderFrame]);

  const handleScrollDown = () => {
    const container = containerRef.current;
    if (container) {
      const nextSection = container.nextElementSibling;
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="cinematic-hero-section"
      aria-label="Cinematic Campus Exploration"
    >
      {/* Sticky Canvas Viewport */}
      <div className="cinematic-sticky-viewport">
        {/* Cinematic Video Canvas */}
        <canvas
          ref={canvasRef}
          className="cinematic-canvas"
          aria-label="CampusFind cinematic video showing university campus, sunset lighting, pathways, and recovery landmarks"
          role="img"
        />

        {/* Subtle, Clean Ambient Vignette (Keeps Video Sharp and Unobscured) */}
        <div className="cinematic-color-grading" aria-hidden="true" />

        {/* Foreground Content: Clean Header & Navigation Support */}
        <div className="container cinematic-content-layer">
          {/* Main Hero Header (Fades smoothly as user begins exploring the video) */}
          <div
            ref={heroHeaderRef}
            className="hero-header-card"
          >
            <div className="badge-pill badge-hero">
              <Sparkles size={14} className="badge-sparkle" />
              <span>Campus Lost & Found • Official Portal</span>
            </div>

            <h1 className="heading-display hero-title">
              Lost Something <br />
              <span className="text-gradient">on Campus?</span>
            </h1>

            <p className="hero-description">
              Report lost items, discover found belongings, and reconnect with what matters — all in one trusted campus community.
            </p>

            <div className="hero-cta-group">
              <button
                onClick={() => onOpenReport('lost')}
                className="btn btn-primary btn-hero-primary"
                id="hero-report-btn"
              >
                <span>Report Lost Item</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={onBrowseItems}
                className="btn btn-secondary btn-hero-secondary"
                id="hero-browse-btn"
              >
                <Search size={18} />
                <span>Browse Found Items</span>
              </button>
            </div>

            <div className="hero-micro-stats">
              <div className="micro-stat-item">
                <ShieldCheck size={16} className="stat-icon-violet" />
                <span>Verified Student Pickup</span>
              </div>
              <div className="stat-divider" />
              <div className="micro-stat-item">
                <MapPin size={16} className="stat-icon-coral" />
                <span>All Campus Zones Active</span>
              </div>
              <div className="stat-divider" />
              <div className="micro-stat-item">
                <CheckCircle2 size={16} className="stat-icon-mint" />
                <span>94% Recovery Rate</span>
              </div>
            </div>
          </div>

          {/* Minimal, Sleek Timeline Controller at Bottom (Keeps Video Unobstructed) */}
          <div className="cinematic-hud-bottom">
            <div className="hud-indicator-pill">
              <span className="hud-dot" />
              <span ref={hudLabelRef} className="hud-label">
                Campus Cinematic Scrub • Frame 1 / {TOTAL_FRAMES}
              </span>
              <span ref={hudPercentRef} className="hud-percent">0%</span>
            </div>

            {/* Scroll progress track */}
            <div className="hud-progress-bar-track">
              <div
                ref={hudFillRef}
                className="hud-progress-bar-fill"
                style={{ width: '0%' }}
              />
            </div>

            <button
              onClick={handleScrollDown}
              className="scroll-hint-btn"
              aria-label="Scroll down to continue through the campus portal"
            >
              <span ref={scrollHintRef} className="scroll-hint-text">
                Scroll down to travel through campus
              </span>
              <span className="scroll-chevron">↓</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
