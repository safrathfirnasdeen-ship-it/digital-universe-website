import { INSTITUTE_INFO } from '../coursesData.js';

export function setupContactSection() {
  const mapContainer = document.getElementById('map-embed-container');
  const form = document.getElementById('quick-inquiry-form');

  // ── Map (loaded lazily by the browser) ─────────────────────
  if (mapContainer) {
    const { lat, lng } = INSTITUTE_INFO.coordinates;
    const embed = `https://maps.google.com/maps?q=${lat},${lng}&z=16&output=embed`;
    const open = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    mapContainer.innerHTML = `
      <div class="map-frame">
        <iframe title="Map showing Digital Universe on A.R Road, Koothanallur"
          src="${embed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
      <a class="map-link" href="${open}" target="_blank" rel="noopener">
        <i data-lucide="navigation"></i> Get directions in Google Maps
      </a>`;
  }

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameEl = document.getElementById('form-name');
    const phoneEl = document.getElementById('form-phone');
    const name = nameEl.value.trim();
    const phone = phoneEl.value.trim();
    const interest = document.getElementById('form-course').value;
    const message = document.getElementById('form-message').value.trim();

    if (!name || !phone) {
      showError(!name ? 'Add your name so we know who to reply to.' : 'Add your mobile number so we can reply on WhatsApp.');
      (!name ? nameEl : phoneEl).focus();
      return;
    }

    const isWebsite = interest === 'Website creation for my business';
    const label = isWebsite ? '*Website enquiry*' : interest && interest !== 'Something else' ? '*Course enquiry*' : '*New enquiry*';
    const lines = [
      label,
      `Name: ${name}`,
      `Phone: ${phone}`,
      interest ? `Interested in: ${interest}` : null,
      `Message: ${message || '—'}`,
      '',
      'Sent from digitaluniverseknr.com',
    ].filter(l => l !== null);

    const waUrl = `https://wa.me/${INSTITUTE_INFO.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`;
    const subject = `${isWebsite ? 'Website enquiry' : 'Enquiry'} from ${name}`;
    const mailUrl = `mailto:${INSTITUTE_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n').replace(/\*/g, ''))}`;

    // Open WhatsApp inside the click so it isn't treated as a pop-up.
    const w = window.open(waUrl, '_blank');
    if (w) w.opener = null;
    showSendOptions(waUrl, mailUrl, !w);
  });
}

function showError(text) {
  const box = document.getElementById('form-status');
  if (!box) return;
  box.innerHTML = '<p class="form-error"></p>';
  box.firstChild.textContent = text;
}

function showSendOptions(waUrl, mailUrl, waBlocked) {
  const box = document.getElementById('form-status');
  if (!box) return;
  box.innerHTML = `
    <div class="send-options">
      <p class="send-options-msg"></p>
      <div class="send-options-btns">
        <a class="btn btn-sm btn-wa" target="_blank" rel="noopener"><i data-lucide="message-circle"></i> Open WhatsApp</a>
        <a class="btn btn-sm btn-ghost send-opt-mail"><i data-lucide="mail"></i> Send by email instead</a>
      </div>
    </div>`;
  box.querySelector('.send-options-msg').textContent = waBlocked
    ? 'Your message is ready. Choose how to send it:'
    : 'WhatsApp opened with your message — press Send there. Or email it to us:';
  box.querySelector('.btn-wa').href = waUrl;
  box.querySelector('.send-opt-mail').href = mailUrl;
  if (window.lucide) window.lucide.createIcons();
}
