import '../shared.js';

const dialog = document.querySelector('#wedding-dialog');
const title = document.querySelector('#dialog-title');
const image = document.querySelector('#dialog-image');
const description = document.querySelector('#dialog-description');
const action = document.querySelector('#dialog-action');
const summary = document.querySelector('#enquiry-summary');
const copy = document.querySelector('#copy-enquiry');
const status = document.querySelector('#copy-status');
const form = document.querySelector('#wedding-enquiry');

function openDetails(name, text, photo, fullPhoto = false) {
  title.textContent = name;
  description.textContent = text;
  image.hidden = !photo;
  image.toggleAttribute('data-full-photo', fullPhoto);
  if (photo) { image.src = photo.src; image.alt = photo.alt; }
  else image.removeAttribute('src');
  action.hidden = false;
  action.href = '#enquiry';
  action.textContent = 'Plan your wedding';
  summary.hidden = true;
  copy.hidden = true;
  status.textContent = '';
  dialog.showModal();
}
for (const button of document.querySelectorAll('[data-close]')) button.addEventListener('click', () => dialog.close());
action.addEventListener('click', () => dialog.close());
for (const button of document.querySelectorAll('[data-venue]')) {
  button.addEventListener('click', () => {
    const card = button.closest('article');
    openDetails(card.querySelector('h3').textContent,
      card.querySelector('.venue-description').textContent + ' Contact our wedding team to discuss spaces, guest numbers and available dates.', card.querySelector('img'));
  });
}
for (const button of document.querySelectorAll('[data-gallery]')) {
  button.addEventListener('click', () => {
    const photo = button.querySelector('img');
    openDetails('Weddings at our properties', photo.alt, photo, true);
  });
}
for (const button of document.querySelectorAll('[data-page]')) {
  button.addEventListener('click', () => openDetails(button.dataset.page, 'This link will be connected when the remaining site pages are added.'));
}
const now = new Date();
form.elements.date.min = [now.getFullYear(), String(now.getMonth()+1).padStart(2,'0'), String(now.getDate()).padStart(2,'0')].join('-');
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  openDetails('Your wedding enquiry', 'Your details are ready to share. Online delivery is not connected yet. Copy your enquiry and call our wedding team to discuss your celebration.');
  summary.textContent = ['Name: '+data.get('name'), 'Phone: '+data.get('phone'), 'Email: '+data.get('email'), 'Celebration date: '+data.get('date'), 'Guests: '+data.get('guests'), 'Details: '+data.get('message')].join('\n');
  summary.hidden = false;
  copy.hidden = false;
  action.href = 'tel:+919816608800';
  action.textContent = 'Call wedding team';
});
copy.addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(summary.textContent); status.textContent = 'Enquiry copied.'; }
  catch { status.textContent = 'Select and copy the enquiry details above.'; }
});
