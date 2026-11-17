import '../shared.js';
import { initGuestStories } from '../testimonials.js';

initGuestStories();

const dialog = document.querySelector('#about-dialog');
for (const button of document.querySelectorAll('[data-close]')) button.addEventListener('click', () => dialog.close());
for (const button of document.querySelectorAll('[data-page]')) {
  button.addEventListener('click', () => {
    document.querySelector('#dialog-title').textContent = button.dataset.page;
    dialog.showModal();
  });
}
