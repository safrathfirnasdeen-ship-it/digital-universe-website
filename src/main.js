import './icons.js';
import { COURSES_DATA } from './coursesData.js';
import { setupCourseModal } from './components/courseModal.js';
import { setupContactSection } from './components/contactMap.js';
import { setupNavigation } from './components/navigation.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize CSS Star Canvas Particle System
  initStarCanvas();

  // 2. Setup Modal
  const modal = setupCourseModal();

  // 4. Render Course Cards in Chapter 3
  renderRichCourseCards(COURSES_DATA, modal);

  // 5. Setup Navigation & Contact Section
  setupNavigation();
  setupContactSection();

  // 6. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

// ============================================================
// STAR CANVAS PARTICLE SYSTEM
// Renders twinkling stars on the #star-canvas element
// ============================================================
function initStarCanvas() {
  const canvas = document.getElementById('star-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isSmall = window.innerWidth < 768;
  const STAR_COUNT = isSmall ? 110 : 220;
  let stars = [];
  let w = 0, h = 0;

  // Pre-render one glow sprite per colour once, instead of building a
  // radial gradient for every star on every frame.
  function makeSprite(hue) {
    const s = document.createElement('canvas');
    s.width = s.height = 32;
    const c = s.getContext('2d');
    const g = c.createRadialGradient(16, 16, 0, 16, 16, 16);
    const col = hue === 0 ? '255,255,255' : hue < 210 ? '170,240,255' : '190,210,255';
    g.addColorStop(0, `rgba(${col},1)`);
    g.addColorStop(0.18, `rgba(${col},0.9)`);
    g.addColorStop(0.35, `rgba(${col},0.25)`);
    g.addColorStop(1, `rgba(${col},0)`);
    c.fillStyle = g;
    c.fillRect(0, 0, 32, 32);
    return s;
  }
  const sprites = { white: makeSprite(0), teal: makeSprite(190), blue: makeSprite(230) };

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    generateStars();
    if (reduceMotion) draw(0);
  }

  function generateStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      const r = Math.random();
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 1.8 + 0.2,
        sprite: r > 0.9 ? sprites.blue : r > 0.8 ? sprites.teal : sprites.white,
        opacity: Math.random() * 0.5 + 0.3,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
        driftX: (Math.random() - 0.5) * 0.04,
        driftY: (Math.random() - 0.5) * 0.04,
      });
    }
  }

  let frame = 0;
  let running = false;
  function draw() {
    ctx.clearRect(0, 0, w, h);
    frame++;
    for (const star of stars) {
      const alpha = star.opacity + Math.sin(frame * star.twinkleSpeed + star.twinkleOffset) * 0.25;
      star.x = (star.x + star.driftX + w) % w;
      star.y = (star.y + star.driftY + h) % h;
      const d = star.size * 7;
      ctx.globalAlpha = alpha < 0 ? 0 : alpha;
      ctx.drawImage(star.sprite, star.x - d / 2, star.y - d / 2, d, d);
    }
    ctx.globalAlpha = 1;
  }

  function loop() {
    if (!running) return;
    draw();
    requestAnimationFrame(loop);
  }
  function start() {
    if (running || reduceMotion) return;
    running = true;
    requestAnimationFrame(loop);
  }

  // Stop animating when the tab is in the background (saves battery/CPU).
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) running = false; else start();
  });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });
  resize();
  start();
}

function renderRichCourseCards(courses, modal) {
  const container = document.getElementById('courses-cards-container');
  if (!container) return;

  container.innerHTML = courses.map(course => `
    <div class="rich-card course-card-rich" data-id="${course.id}">
      <div class="card-num-watermark">MODULE ${course.number}</div>
      <div class="card-icon-badge">
        <i data-lucide="${course.icon}"></i>
      </div>
      <h3>${course.title}</h3>
      <p style="margin-bottom: 1.2rem; min-height: 2.8em;">${course.summary}</p>
      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 0.8rem; font-size: 0.85rem;">
        <span style="color: var(--cyan-bright); font-weight: 600;">${course.duration}</span>
        <span class="course-arrow" style="font-weight: 600; display: inline-flex; align-items: center; gap: 0.3rem;">
          View Syllabus <i data-lucide="arrow-right"></i>
        </span>
      </div>
    </div>
  `).join('');

  // Add click listeners to open modal
  container.querySelectorAll('.course-card-rich').forEach(card => {
    card.addEventListener('click', () => {
      const courseId = card.getAttribute('data-id');
      const course = COURSES_DATA.find(c => c.id === courseId);
      if (course) {
        modal.open(course);
      }
    });
  });

  if (window.lucide) {
    window.lucide.createIcons();
  }
}
