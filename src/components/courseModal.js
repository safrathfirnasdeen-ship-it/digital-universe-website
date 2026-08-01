import { INSTITUTE_INFO } from '../coursesData.js';

export function setupCourseModal(onCloseCallback) {
  const modalOverlay = document.getElementById('course-modal');
  const modalContainer = document.getElementById('modal-container');
  const closeBtn = document.getElementById('modal-close-btn');

  const hideModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    if (onCloseCallback) onCloseCallback();
  };

  if (closeBtn) {
    closeBtn.addEventListener('click', hideModal);
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) hideModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      hideModal();
    }
  });

  return {
    open: (course) => {
      renderCourseDetails(course, modalContainer);
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    },
    close: hideModal
  };
}

function renderCourseDetails(course, container) {
  const whatsappMsg = encodeURIComponent(
    `Hello Digital Universe Institute, I am interested in enrolling for the "${course.title}" course. Please share batch details!`
  );
  const whatsappUrl = `https://wa.me/${INSTITUTE_INFO.whatsapp}?text=${whatsappMsg}`;

  container.innerHTML = `
    <div class="modal-header" style="border-left: 4px solid ${course.color};">
      <div class="modal-badge-group">
        <span class="course-num-pill" style="background: ${course.color}22; color: ${course.color}; border: 1px solid ${course.color}66;">
          Module ${course.number}
        </span>
        <span class="course-cat-pill">${course.category}</span>
        <span class="course-badge-highlight">${course.badge}</span>
      </div>
      <h2 class="modal-title">${course.title}</h2>
      <p class="modal-summary">${course.summary}</p>
    </div>

    <div class="modal-story-card">
      <div class="story-icon">🌌</div>
      <div class="story-text">
        <h4>Learning Journey Story</h4>
        <p>"${course.story}"</p>
      </div>
    </div>

    <div class="modal-grid">
      <div class="modal-col">
        <h3><i data-lucide="book-open"></i> Key Modules Covered</h3>
        <ul class="modules-list">
          ${course.modules.map(mod => `<li><i data-lucide="check-circle-2" style="color: ${course.color};"></i> ${mod}</li>`).join('')}
        </ul>
      </div>

      <div class="modal-col">
        <h3><i data-lucide="award"></i> Skills You Will Acquire</h3>
        <div class="skills-flex">
          ${course.skills.map(sk => `<span class="skill-tag" style="background: ${course.color}15; border-color: ${course.color}44; color: #fff;">${sk}</span>`).join('')}
        </div>

        <div class="duration-box">
          <i data-lucide="clock" style="color: ${course.color};"></i>
          <div>
            <strong>Course Duration</strong>
            <span>${course.duration} (Flexible Shifts Available)</span>
          </div>
        </div>
      </div>
    </div>

    <div class="modal-actions">
      <a href="${whatsappUrl}" target="_blank" rel="noopener" class="btn btn-primary" style="background: linear-gradient(135deg, ${course.color}, #0066ff); border: none;">
        <i data-lucide="message-square"></i> Enroll via WhatsApp
      </a>
      <a href="tel:${INSTITUTE_INFO.phone.replace(/\s+/g, '')}" class="btn btn-secondary">
        <i data-lucide="phone"></i> Call Hotline: ${INSTITUTE_INFO.phone}
      </a>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }
}
