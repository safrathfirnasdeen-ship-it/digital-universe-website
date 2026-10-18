export function setupNavigation() {
  const header = document.querySelector('.header');
  const navLinks = document.querySelectorAll('.nav-link');
  const toggle = document.getElementById('mobile-menu-toggle');
  const menu = document.getElementById('nav-menu');

  const setMenu = (open) => {
    if (!menu || !toggle) return;
    menu.classList.toggle('active', open);
    toggle.classList.toggle('active', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };

  toggle?.addEventListener('click', () => setMenu(!menu.classList.contains('active')));
  document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  // Header gets a solid background once you scroll past the top.
  const onScroll = () => header?.classList.toggle('scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Highlight the section you're reading.
  const linkFor = id => document.querySelector(`.nav-link[href="#${id}"]`);
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(l => l.removeAttribute('aria-current'));
      linkFor(entry.target.id)?.setAttribute('aria-current', 'true');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main section[id]').forEach(s => observer.observe(s));
}
