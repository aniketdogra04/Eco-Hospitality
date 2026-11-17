import { localDate, prepareEmailEnquiry } from './hotel.js';

const tableDialog = document.querySelector('#table-dialog');
const tableForm = document.querySelector('#table-enquiry');
const guestName = tableForm.elements.name;

for (const button of document.querySelectorAll('[data-book-table]')) {
  button.addEventListener('click', () => {
    tableForm.elements.date.min = localDate(new Date());
    tableDialog.showModal();
  });
}
guestName.addEventListener('input', () => guestName.setCustomValidity(''));
tableForm.addEventListener('submit', event => {
  event.preventDefault();
  guestName.setCustomValidity(guestName.value.trim() ? '' : 'Please enter your name.');
  tableForm.elements.date.min = localDate(new Date());
  if (!tableForm.reportValidity()) return;
  const data = new FormData(tableForm);
  const name = String(data.get('name')).trim();
  const details = [
    'Golden Fern Resort — table enquiry',
    'Name: ' + name,
    'Email: ' + data.get('email'),
    'Preferred date: ' + String(data.get('date')).split('-').reverse().join('/'),
    'Preferred time: ' + data.get('time'),
    'Guests: ' + data.get('guests'),
    '',
    'Special requests: ' + (String(data.get('requests')).trim() || 'None'),
    '',
    'Please confirm table availability for this request.',
  ].join('\n');
  tableDialog.close();
  prepareEmailEnquiry({
    heading: 'Your table enquiry',
    message: 'Your request is ready to send to goldenfern@ecohospitality.in from your email app. The restaurant will confirm availability; your table is reserved once they confirm it.',
    details,
    subject: 'Golden Fern table enquiry — ' + name,
  });
});
