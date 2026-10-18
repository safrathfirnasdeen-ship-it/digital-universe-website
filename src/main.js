import '@fontsource-variable/newsreader/wght.css';
import '@fontsource-variable/hanken-grotesk/wght.css';
import './style.css';
import './icons.js';
import { COURSES_DATA } from './coursesData.js';
import { setupCourseModal } from './components/courseModal.js';
import { setupContactSection } from './components/contactMap.js';
import { setupNavigation } from './components/navigation.js';
import { initStarCanvas } from './stars.js';

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
function renderRichCourseCards(courses, modal) {
  const container = document.getElementById('courses-cards-container');
  if (!container) return;

  container.innerHTML = courses.map(course => `
    <li>
      <button type="button" class="course" data-id="${course.id}" aria-haspopup="dialog">
        <span class="course-icon"><i data-lucide="${course.icon}"></i></span>
        <span class="course-body">
          <span class="course-title">${course.title}</span>
          <span class="course-summary">${course.summary}</span>
        </span>
        <span class="course-meta">
          <span class="course-duration">${course.duration}</span>
          <span class="course-link">Syllabus <i data-lucide="arrow-right"></i></span>
        </span>
      </button>
    </li>
  `).join('');

  container.querySelectorAll('.course').forEach(btn => {
    btn.addEventListener('click', () => {
      const course = COURSES_DATA.find(c => c.id === btn.dataset.id);
      if (course) modal.open(course, btn);
    });
  });

  if (window.lucide) window.lucide.createIcons();
}
