import { INSTITUTE_INFO } from '../coursesData.js';

export function setupContactSection() {
  const mapContainer = document.getElementById('map-embed-container');
  const contactForm = document.getElementById('quick-inquiry-form');

  // ── Map Embed ──────────────────────────────────────────────
  if (mapContainer) {
    const lat = INSTITUTE_INFO.coordinates.lat;
    const lng = INSTITUTE_INFO.coordinates.lng;
    const mapsEmbedUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=17&output=embed`;
    const googleMapsDirectUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

    mapContainer.innerHTML = `
      <div class="map-wrapper">
        <iframe 
          title="Digital Universe Institute Location Map"
          src="${mapsEmbedUrl}" 
          width="100%" 
          height="100%" 
          style="border:0; filter: contrast(1.1) saturate(1.2) hue-rotate(190deg) invert(0.9) brightness(0.9);" 
          allowfullscreen="" 
          loading="lazy" 
          referrerpolicy="no-referrer-when-downgrade">
        </iframe>
        <div class="map-overlay-badge">
          <div class="pin-pulse"></div>
          <div>
            <strong>A.R Road, Koothanallur</strong>
            <span>GPS: ${lat.toFixed(6)}, ${lng.toFixed(6)}</span>
          </div>
          <a href="${googleMapsDirectUrl}" target="_blank" rel="noopener" class="btn-map-link">
            <i data-lucide="navigation"></i> Open in Maps
          </a>
        </div>
      </div>
    `;
  }

  // ── Tab Switcher (Enroll / Enquiry) ────────────────────────
  window.switchTab = function(tab) {
    const tabEnroll  = document.getElementById('tab-enroll');
    const tabEnquiry = document.getElementById('tab-enquiry');
    const courseField = document.getElementById('course-field');
    const formDesc    = document.getElementById('form-desc');

    if (tab === 'enroll') {
      tabEnroll?.classList.add('active-tab');
      tabEnquiry?.classList.remove('active-tab');
      if (courseField) courseField.style.display = 'block';
      if (formDesc) formDesc.textContent = "Fill in your details — we'll reach you on WhatsApp & email instantly.";
    } else {
      tabEnquiry?.classList.add('active-tab');
      tabEnroll?.classList.remove('active-tab');
      if (courseField) courseField.style.display = 'none';
      if (formDesc) formDesc.textContent = "Have a question? Send us an enquiry — we'll reply on WhatsApp & email.";
    }
    if (window.lucide) window.lucide.createIcons();
  };

  // ── Combined WhatsApp & Gmail Submit ────────────────────────
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name    = document.getElementById('form-name')?.value.trim() || '';
      const phone   = document.getElementById('form-phone')?.value.trim() || '';
      const course  = document.getElementById('form-course')?.value || 'General Enquiry';
      const message = document.getElementById('form-message')?.value.trim() || '';
      const isEnquiry = document.getElementById('tab-enquiry')?.classList.contains('active-tab');

      if (!name || !phone) {
        showStatus('Please fill in your Name and Phone number.', 'error');
        return;
      }

      // 1. Format WhatsApp message
      const waLabel = isEnquiry ? '*New Enquiry*' : '*New Enrollment Request*';
      const waMessage = `${waLabel}\n👤 Name: ${name}\n📞 Phone: ${phone}${!isEnquiry ? `\n📚 Course: ${course}` : ''}\n💬 Message: ${message || 'N/A'}\n\nFrom: Digital Universe Website`;
      const waUrl = `https://wa.me/${INSTITUTE_INFO.whatsapp}?text=${encodeURIComponent(waMessage)}`;

      // 2. Format Gmail compose message
      const subject = isEnquiry
        ? `Enquiry from ${name} — Digital Universe Website`
        : `Enrollment Request: ${course} — ${name}`;
      const emailBody = isEnquiry
        ? `Hello,\n\nI have an enquiry:\n\nName: ${name}\nPhone: ${phone}\nMessage: ${message || 'N/A'}\n\nSent from Digital Universe Training Institute Website.`
        : `Hello,\n\nI would like to enroll in the following course:\n\nName: ${name}\nPhone: ${phone}\nCourse: ${course}\nMessage: ${message || 'N/A'}\n\nSent from Digital Universe Training Institute Website.`;
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(INSTITUTE_INFO.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

      // Show status
      showStatus('Redirecting to WhatsApp & Gmail...', 'success');

      // Open WhatsApp first, then Gmail in new tabs
      setTimeout(() => window.open(waUrl, '_blank'), 400);
      setTimeout(() => window.open(gmailUrl, '_blank'), 800);
    });
  }

  // ── Header Enquiry Button → Switch to Enquiry tab ─────────
  const headerEnquiryBtn = document.getElementById('btn-enquiry-header');
  if (headerEnquiryBtn) {
    headerEnquiryBtn.addEventListener('click', () => {
      setTimeout(() => window.switchTab('enquiry'), 400);
    });
  }
}

// ── Status Message Helper ──────────────────────────────────────
function showStatus(msg, type) {
  const box = document.getElementById('form-status');
  if (!box) return;
  const color = type === 'success' ? 'var(--cyan-bright)' : '#f43f5e';
  const icon  = type === 'success' ? 'check-circle-2' : 'alert-circle';
  box.innerHTML = `
    <div style="display:flex;align-items:center;gap:0.5rem;padding:0.8rem 1rem;border-radius:10px;
      background:rgba(${type === 'success' ? '56,189,248' : '244,63,94'},0.1);
      border:1px solid ${color};color:${color};font-size:0.9rem;margin-top:0.5rem;">
      <i data-lucide="${icon}" style="width:16px;height:16px;flex-shrink:0;"></i>
      ${msg}
    </div>`;
  if (window.lucide) window.lucide.createIcons();
}
