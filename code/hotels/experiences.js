import { showDetails } from './hotel.js';

const action = document.querySelector('#experience-enquiry');
for (const button of document.querySelectorAll('[data-experience]')) {
  button.addEventListener('click', () => {
    const card = button.closest('article');
    showDetails(
      card.querySelector('h3').textContent,
      'Contact Golden Fern Resort to learn about spa services, timings, prices and availability for your stay.',
      card.querySelector('img'),
    );
    action.hidden = false;
    action.textContent = 'Ask about this experience';
    action.href = 'golden-fern-contact.html?experience=spa#contact-enquiry';
  });
}
document.querySelector('#more-experiences').addEventListener('click', () => {
  showDetails('Explore more experiences', 'Ask the Golden Fern team about experiences available during your stay. They can help with current options, arrangements and availability.');
  action.hidden = false;
  action.textContent = 'Ask our team';
  action.href = 'golden-fern-contact.html?experience=more#contact-enquiry';
});
for (const button of document.querySelectorAll('[data-page]')) {
  button.addEventListener('click', () => { action.hidden = true; });
}
