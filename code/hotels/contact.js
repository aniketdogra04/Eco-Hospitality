import { prepareEmailEnquiry } from './hotel.js';

const form = document.querySelector('#contact-enquiry');
const recipient = 'sales@ecohospitality.in';

// Only known experience links can seed an enquiry; keep visitor-entered text.
const experience = new URLSearchParams(window.location.search).get('experience');
const experienceMessages = {
  spa: 'I would like to know more about The Spa at Golden Fern Resort. Please share available services, timings, prices and availability for my stay.',
  more: 'I would like to learn about the experiences available during my stay at Golden Fern Resort. Please share the options and availability.',
};
if (Object.hasOwn(experienceMessages, experience) && !form.elements.message.value) {
  form.elements.message.value = experienceMessages[experience];
}

for (const field of [form.elements.name, form.elements.phone, form.elements.message]) {
  field.addEventListener('input', () => field.setCustomValidity(''));
}
form.addEventListener('submit', event => {
  event.preventDefault();
  for (const field of [form.elements.name, form.elements.message]) {
    field.setCustomValidity(field.value.trim() ? '' : 'Please complete this field.');
  }
  form.elements.phone.setCustomValidity(form.elements.phone.value.replace(/\D/g, '').length >= 7 ? '' : 'Please enter a valid phone number.');
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const name = String(data.get('name')).trim();
  const details = [
    'Golden Fern Resort — contact enquiry',
    'Name: ' + name,
    'Phone: ' + String(data.get('phone')).trim(),
    'Email: ' + String(data.get('email')).trim(),
    '',
    'Message:',
    String(data.get('message')).trim(),
  ].join('\n');
  prepareEmailEnquiry({
    heading: 'Your contact enquiry',
    message: 'Your message is ready to send to ' + recipient + ' from your email app. You can review or copy the details below. The team will respond after you send the enquiry.',
    details,
    subject: 'Golden Fern contact enquiry — ' + name,
    recipient,
  });
});
