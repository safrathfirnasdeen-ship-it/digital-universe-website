import { COURSES_DATA } from './coursesData.js';
import { ThreeSceneManager } from './three/threeApp.js';
import { setupCourseModal } from './components/courseModal.js';
import { setupContactSection } from './components/contactMap.js';
import { setupNavigation } from './components/navigation.js';

document.addEventListener('DOMContentLoaded', () => {
  const canvasElement = document.getElementById('bg-canvas');

  // 1. Initialize CSS Star Canvas Particle System
  initStarCanvas();

  // 2. Setup Modal
  const modal = setupCourseModal();

  // 3. Setup Three.js Scene
  let threeManager = null;
  if (canvasElement) {
    threeManager = new ThreeSceneManager(canvasElement);
  }

  // 4. Render Course Cards in Chapter 3
  renderRichCourseCards(COURSES_DATA, modal);

  // 5. Setup Navigation & Contact Section
  setupNavigation(threeManager);
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
  let stars = [];
  const STAR_COUNT = 220;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    generateStars();
  }

  function generateStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      const size = Math.random() * 1.8 + 0.2;
      const hue = Math.random() > 0.8 ? Math.random() * 60 + 180 : 0; // mostly white, some blue-teal
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size,
        hue,
        opacity: Math.random() * 0.5 + 0.3,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
        // subtle drift
        driftX: (Math.random() - 0.5) * 0.04,
        driftY: (Math.random() - 0.5) * 0.04,
      });
    }
  }

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frame++;

    for (const star of stars) {
      // Twinkling effect
      const twinkle = Math.sin(frame * star.twinkleSpeed + star.twinkleOffset);
      const alpha = star.opacity + twinkle * 0.25;

      // Drift slowly
      star.x = (star.x + star.driftX + canvas.width) % canvas.width;
      star.y = (star.y + star.driftY + canvas.height) % canvas.height;

      // Draw star with glow
      const color = star.hue === 0
        ? `rgba(255, 255, 255, ${alpha})`
        : `hsla(${star.hue}, 90%, 85%, ${alpha})`;

      // Glow halo
      if (star.size > 1.2) {
        const grd = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 3.5);
        grd.addColorStop(0, `hsla(${star.hue || 200}, 80%, 90%, ${alpha * 0.5})`);
        grd.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      }

      // Core dot
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
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
