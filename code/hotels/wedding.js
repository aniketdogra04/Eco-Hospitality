import { localDate, prepareEmailEnquiry } from './hotel.js';

const enquiryDialog = document.querySelector('#wedding-enquiry-dialog');
const form = document.querySelector('#wedding-enquiry');
const guestName = form.elements.name;
const phone = form.elements.phone;

for (const button of document.querySelectorAll('[data-wedding-enquiry]')) {
  button.addEventListener('click', () => {
    form.elements.date.min = localDate(new Date());
    enquiryDialog.showModal();
  });
}
for (const field of [guestName, phone]) {
  field.addEventListener('input', () => field.setCustomValidity(''));
}
form.addEventListener('submit', event => {
  event.preventDefault();
  guestName.setCustomValidity(guestName.value.trim() ? '' : 'Please enter your name.');
  phone.setCustomValidity(phone.value.trim() ? '' : 'Please enter your phone number.');
  form.elements.date.min = localDate(new Date());
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const name = String(data.get('name')).trim();
  const details = [
    'Golden Fern Resort — wedding enquiry',
    'Name: ' + name,
    'Email: ' + data.get('email'),
    'Phone: ' + String(data.get('phone')).trim(),
    'Celebration date: ' + String(data.get('date')).split('-').reverse().join('/'),
    'Guests: ' + data.get('guests'),
    '',
    'Plans: ' + (String(data.get('message')).trim() || 'To be discussed'),
    '',
    'Please confirm venue availability and discuss arrangements for our celebration.',
  ].join('\n');
  enquiryDialog.close();
  prepareEmailEnquiry({
    heading: 'Your wedding enquiry',
    message: 'Your enquiry is ready to send to goldenfern@ecohospitality.in from your email app. The hotel team will confirm venue availability and arrangements.',
    details,
    subject: 'Golden Fern wedding enquiry — ' + name,
  });
});
