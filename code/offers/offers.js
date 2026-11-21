import '../shared.js';

const dialog = document.querySelector('#offer-dialog');
const enquiry = document.querySelector('#offer-enquiry');
const subject = 'Offer enquiry — Stay longer, save more at Spiti';
const body = [
  'Hello Eco Hospitality,', '',
  'I would like to enquire about the Stay longer, save more at Spiti offer.',
  'Discount shown: 25% off',
  'Validity shown: 25 December 2026 to 31 January 2027', '',
  'Please share the offer details, applicable terms and availability.',
].join('\n');
enquiry.href = 'mailto:sales@ecohospitality.in?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
for (const button of document.querySelectorAll('[data-offer]')) {
  button.addEventListener('click', () => dialog.showModal());
}
for (const button of dialog.querySelectorAll('[data-close]')) {
  button.addEventListener('click', () => dialog.close());
}
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
});
