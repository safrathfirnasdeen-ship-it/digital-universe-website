import { INSTITUTE_INFO } from '../coursesData.js';

export function setupCourseModal() {
  const overlay = document.getElementById('course-modal');
  const container = document.getElementById('modal-container');
  const closeBtn = document.getElementById('modal-close-btn');
  let returnFocus = null;

  const hide = () => {
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (returnFocus) returnFocus.focus();
  };

  closeBtn?.addEventListener('click', hide);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) hide(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) hide();
  });

  return {
    open: (course, trigger) => {
      returnFocus = trigger || null;
      render(course, container);
      overlay.classList.add('active');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => closeBtn?.focus());
    },
    close: hide,
  };
}

function render(course, container) {
  const msg = encodeURIComponent(
    `Hi Digital Universe, I'm interested in the "${course.title}" course. Please share the next batch details.`
  );
  const waUrl = `https://wa.me/${INSTITUTE_INFO.whatsapp}?text=${msg}`;

  container.innerHTML = `
    <p class="modal-cat">${course.category}</p>
    <h2 class="modal-title" id="modal-title">${course.title}</h2>
    <p class="modal-summary">${course.story}</p>

    <div class="modal-grid">
      <div>
        <h3>What you'll learn</h3>
        <ul class="tick-list">
          ${course.modules.map(m => `<li><i data-lucide="check"></i> ${m}</li>`).join('')}
        </ul>
      </div>
      <div>
        <h3>Skills you'll leave with</h3>
        <ul class="chip-list">
          ${course.skills.map(s => `<li>${s}</li>`).join('')}
        </ul>
        <p class="modal-duration"><i data-lucide="clock"></i> ${course.duration}, flexible batch timings</p>
      </div>
    </div>

    <div class="modal-actions">
      <a href="${waUrl}" target="_blank" rel="noopener" class="btn btn-gold">
        <i data-lucide="message-circle"></i> Enrol on WhatsApp
      </a>
      <a href="tel:${INSTITUTE_INFO.phone.replace(/\s+/g, '')}" class="btn btn-ghost">
        <i data-lucide="phone"></i> Call ${INSTITUTE_INFO.phone}
      </a>
    </div>
  `;
  if (window.lucide) window.lucide.createIcons();
}
