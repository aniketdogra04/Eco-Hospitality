import '../shared.js';

const dialog = document.querySelector('#dining-dialog');
const title = document.querySelector('#dialog-title');
const image = document.querySelector('#dialog-image');
const description = document.querySelector('#dialog-description');
const action = document.querySelector('#dialog-action');

function openDetails(name, text, photo, fullPhoto = false) {
  title.textContent = name;
  description.textContent = text;
  image.hidden = !photo;
  image.toggleAttribute('data-full-photo', fullPhoto);
  if (photo) { image.src = photo.src; image.alt = photo.alt; }
  else { image.removeAttribute('src'); image.alt = ''; }
  action.hidden = !photo;
  dialog.showModal();
}
for (const button of document.querySelectorAll('[data-close]')) button.addEventListener('click', () => dialog.close());
for (const button of document.querySelectorAll('[data-hotel]')) {
  button.addEventListener('click', () => {
    const card = button.closest('article');
    openDetails(card.querySelector('h3').textContent, 'Explore dining at this featured Shimla retreat. Contact the hotel for menus, table reservations and dietary requirements. Full property details are planned for a dedicated hotel page.', card.querySelector('img'));
  });
}
for (const button of document.querySelectorAll('[data-gallery]')) {
  button.addEventListener('click', () => {
    const photo = button.querySelector('img');
    openDetails('Dining across our properties', photo.alt, photo, true);
  });
}
for (const button of document.querySelectorAll('[data-page]')) {
  button.addEventListener('click', () => openDetails(button.dataset.page, 'This link will be connected when the remaining site pages are added.'));
}
