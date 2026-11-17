import '../shared.js';

const recipient = 'sales@ecohospitality.in';
const form = document.querySelector('#contact-enquiry');
const dialog = document.querySelector('#contact-dialog');
const title = document.querySelector('#dialog-title');
const description = document.querySelector('#dialog-description');
const summary = document.querySelector('#enquiry-summary');
const actions = document.querySelector('#enquiry-actions');
const draft = document.querySelector('#email-draft');
const status = document.querySelector('#copy-status');

function showDetails(name, text) {
  title.textContent = name;
  description.textContent = text;
  summary.hidden = true;
  actions.hidden = true;
  status.textContent = '';
  dialog.showModal();
}
for (const button of document.querySelectorAll('[data-close]')) button.addEventListener('click', () => dialog.close());
for (const button of document.querySelectorAll('[data-page]')) {
  button.addEventListener('click', () => showDetails(button.dataset.page, 'This link will be connected when the remaining site pages are added.'));
}
for (const field of [form.elements.name, form.elements.phone, form.elements.message]) {
  field.addEventListener('input', () => field.setCustomValidity(''));
}
// Preserve what the visitor has typed while routing each card to the enquiry form.
for (const link of document.querySelectorAll('[data-enquiry-topic]')) {
  link.addEventListener('click', event => {
    event.preventDefault();
    form.elements.topic.value = link.dataset.enquiryTopic;
    form.scrollIntoView({ block: 'start' });
    form.elements.name.focus({ preventScroll: true });
  });
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
  const topic = String(data.get('topic'));
  const details = ['Enquiry: ' + topic, 'Name: ' + name, 'Phone: ' + String(data.get('phone')).trim(), 'Email: ' + String(data.get('email')).trim(), '', 'Message:', String(data.get('message')).trim()].join('\n');
  showDetails('Your contact enquiry', 'Your message is ready. Open the email draft below and send it from your email app to ' + recipient + '. You can also copy the details.');
  summary.textContent = details;
  summary.hidden = false;
  actions.hidden = false;
  draft.href = 'mailto:' + recipient + '?subject=' + encodeURIComponent(topic + ' — ' + name) + '&body=' + encodeURIComponent(details);
});
draft.addEventListener('click', () => dialog.close());
document.querySelector('#copy-enquiry').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(summary.textContent); status.textContent = 'Enquiry copied.'; }
  catch { status.textContent = 'Select and copy the enquiry details above.'; }
});
