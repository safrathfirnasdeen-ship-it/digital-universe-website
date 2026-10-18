import '@fontsource-variable/newsreader/wght.css';
import '@fontsource-variable/hanken-grotesk/wght.css';
import './style.css';
import './icons.js';
import { setupNavigation } from './components/navigation.js';
import { initStarCanvas } from './stars.js';

document.addEventListener('DOMContentLoaded', () => {
  initStarCanvas();
  setupNavigation();
  if (window.lucide) window.lucide.createIcons();
});
