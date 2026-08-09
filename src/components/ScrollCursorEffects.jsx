import { useEffect } from 'react';

/**
 * ScrollCursorEffects
 * ──────────────────
 * • Custom gradient cursor (dot + ring) replacing the default arrow
 * • Scroll-progress bar fixed at the top of the viewport
 * • Click burst — 8 particles explode outward on every click
 * • Scroll sparks — glowing sparks trail near cursor while scrolling
 * • Hover orbit — a ✦ star orbits the ring when hovering interactables
 * • Scroll-reveal: elements with className="scroll-reveal" animate in
 */
export default function ScrollCursorEffects() {
  useEffect(() => {

    /* ─────────────────────────────────────────────────
       DOM nodes
    ───────────────────────────────────────────────── */
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    document.body.prepend(progressBar);

    const dot = document.createElement('div');
    dot.id = 'cursor-dot';
    document.body.appendChild(dot);

    const ring = document.createElement('div');
    ring.id = 'cursor-ring';
    document.body.appendChild(ring);

    // Orbiting star shown on hover
    const orbitStar = document.createElement('div');
    orbitStar.id = 'cursor-orbit-star';
    orbitStar.textContent = '✦';
    document.body.appendChild(orbitStar);

    /* ─────────────────────────────────────────────────
       Cursor tracking
    ───────────────────────────────────────────────── */
    let mouseX = -200, mouseY = -200;
    let ringX  = -200, ringY  = -200;
    let rafId;
    let orbitAngle = 0;
    let isHovering = false;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top  = `${mouseY}px`;
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const animateRing = () => {
      ringX = lerp(ringX, mouseX, 0.12);
      ringY = lerp(ringY, mouseY, 0.12);
      ring.style.left = `${ringX}px`;
      ring.style.top  = `${ringY}px`;

      // Orbit star around the ring
      if (isHovering) {
        orbitAngle += 3.5; // degrees per frame
        const rad    = (orbitAngle * Math.PI) / 180;
        const radius = 26; // px from ring centre
        orbitStar.style.left    = `${ringX + Math.cos(rad) * radius}px`;
        orbitStar.style.top     = `${ringY + Math.sin(rad) * radius}px`;
        orbitStar.style.opacity = '1';
      } else {
        orbitStar.style.opacity = '0';
      }

      rafId = requestAnimationFrame(animateRing);
    };
    rafId = requestAnimationFrame(animateRing);

    /* ─────────────────────────────────────────────────
       Hover state
    ───────────────────────────────────────────────── */
    const interactables = 'a, button, [role="button"], input, textarea, select, label, [data-cursor-hover]';

    const onMouseOver = (e) => {
      if (e.target.closest(interactables)) {
        document.body.classList.add('cursor-hover');
        isHovering = true;
      }
    };
    const onMouseOut = (e) => {
      if (e.target.closest(interactables)) {
        document.body.classList.remove('cursor-hover');
        isHovering = false;
      }
    };

    /* ─────────────────────────────────────────────────
       Click burst — 8 particles
    ───────────────────────────────────────────────── */
    const BURST_COLORS = ['#ff5e00', '#ff2a85', '#8a2be2', '#ff7b00', '#d63af9', '#ff2a85', '#ff5e00', '#8a2be2'];

    const spawnBurst = (x, y) => {
      const count = 8;
      for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'cursor-burst-particle';
        const angle  = (i / count) * 360;
        const dist   = 38 + Math.random() * 22; // px travel
        const size   = 4 + Math.random() * 4;
        p.style.cssText = `
          left: ${x}px; top: ${y}px;
          width: ${size}px; height: ${size}px;
          background: ${BURST_COLORS[i]};
          --angle: ${angle}deg; --dist: ${dist}px;
        `;
        document.body.appendChild(p);
        // Remove after animation completes
        p.addEventListener('animationend', () => p.remove(), { once: true });
      }
    };

    const onMouseDown = (e) => {
      document.body.classList.add('cursor-click');
      spawnBurst(e.clientX, e.clientY);
    };
    const onMouseUp = () => document.body.classList.remove('cursor-click');

    /* ─────────────────────────────────────────────────
       Scroll sparks — tiny glowing dots near cursor
    ───────────────────────────────────────────────── */
    const SPARK_COLORS = ['#ff5e00', '#ff2a85', '#8a2be2'];
    let scrollSpark_raf = null;
    let isScrolling = false;
    let scrollTimeout;

    const spawnScrollSpark = () => {
      if (!isScrolling) return;
      const spark = document.createElement('div');
      spark.className = 'cursor-scroll-spark';
      const offsetX = (Math.random() - 0.5) * 28;
      const offsetY = (Math.random() - 0.5) * 28;
      const color   = SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)];
      spark.style.cssText = `
        left: ${mouseX + offsetX}px;
        top:  ${mouseY + offsetY}px;
        background: ${color};
        box-shadow: 0 0 6px ${color};
      `;
      document.body.appendChild(spark);
      spark.addEventListener('animationend', () => spark.remove(), { once: true });

      scrollSpark_raf = setTimeout(spawnScrollSpark, 40); // ~25 sparks/sec
    };

    const onWheel = () => {
      if (!isScrolling) {
        isScrolling = true;
        document.body.classList.add('cursor-scrolling');
        spawnScrollSpark();
      }
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
        document.body.classList.remove('cursor-scrolling');
        clearTimeout(scrollSpark_raf);
      }, 150);
    };

    /* Hide/show cursor when leaving/entering window */
    const onMouseLeave = () => {
      dot.style.opacity       = '0';
      ring.style.opacity      = '0';
      orbitStar.style.opacity = '0';
    };
    const onMouseEnter = () => {
      dot.style.opacity  = '1';
      ring.style.opacity = '1';
    };

    document.addEventListener('mousemove',  onMouseMove);
    document.addEventListener('mouseover',  onMouseOver);
    document.addEventListener('mouseout',   onMouseOut);
    document.addEventListener('mousedown',  onMouseDown);
    document.addEventListener('mouseup',    onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    window.addEventListener('wheel',        onWheel, { passive: true });

    /* ─────────────────────────────────────────────────
       Scroll progress bar
    ───────────────────────────────────────────────── */
    const onScroll = () => {
      const scrollTop    = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      progressBar.style.width = `${pct}%`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ─────────────────────────────────────────────────
       Scroll-reveal observer
    ───────────────────────────────────────────────── */
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    const observeRevealTargets = () => {
      document.querySelectorAll('.scroll-reveal').forEach((el) => {
        revealObserver.observe(el);
      });
    };
    observeRevealTargets();
    const mutationObserver = new MutationObserver(observeRevealTargets);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    /* ─────────────────────────────────────────────────
       Cleanup
    ───────────────────────────────────────────────── */
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(scrollTimeout);
      clearTimeout(scrollSpark_raf);
      document.removeEventListener('mousemove',  onMouseMove);
      document.removeEventListener('mouseover',  onMouseOver);
      document.removeEventListener('mouseout',   onMouseOut);
      document.removeEventListener('mousedown',  onMouseDown);
      document.removeEventListener('mouseup',    onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('wheel',        onWheel);
      window.removeEventListener('scroll',       onScroll);
      revealObserver.disconnect();
      mutationObserver.disconnect();
      progressBar.remove();
      dot.remove();
      ring.remove();
      orbitStar.remove();
      document.body.classList.remove('cursor-hover', 'cursor-click', 'cursor-scrolling');
    };
  }, []);

  return null;
}
