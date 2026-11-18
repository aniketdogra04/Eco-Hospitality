import './hotel.js';

const grid = document.querySelector('#hotel-photos');
const more = document.querySelector('#show-more-photos');
const extraPhotos = [...grid.querySelectorAll('[data-extra-photo]')];
const status = document.querySelector('#gallery-status');
const dialog = document.querySelector('#hotel-dialog');
const photo = document.querySelector('#dialog-image');
const description = document.querySelector('#dialog-description');
const count = document.querySelector('#photo-count');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let currentPhoto = 0;

function visiblePhotos() {
  return [...grid.querySelectorAll('[data-gallery]')].filter(button => !button.hidden);
}
function updatePhoto(index) {
  const photos = visiblePhotos();
  currentPhoto = (index + photos.length) % photos.length;
  const image = photos[currentPhoto].querySelector('img');
  photo.src = image.src;
  photo.alt = image.alt;
  description.textContent = image.alt;
  count.textContent = (currentPhoto + 1) + ' / ' + photos.length;
}
for (const button of grid.querySelectorAll('[data-gallery]')) {
  button.addEventListener('click', () => updatePhoto(visiblePhotos().indexOf(button)));
}
for (const button of document.querySelectorAll('[data-photo-step]')) {
  button.addEventListener('click', () => updatePhoto(currentPhoto + Number(button.dataset.photoStep)));
}
dialog.addEventListener('keydown', event => {
  if (!photo.hasAttribute('data-full-photo')) return;
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    updatePhoto(currentPhoto + (event.key === 'ArrowLeft' ? -1 : 1));
  }
});
more.addEventListener('click', () => {
  const expanded = more.getAttribute('aria-expanded') === 'true';
  for (const button of extraPhotos) button.hidden = expanded;
  more.setAttribute('aria-expanded', String(!expanded));
  more.textContent = expanded ? 'Show more' : 'Show less';
  status.textContent = 'Showing ' + visiblePhotos().length + ' photos.';
  if (!expanded) {
    // The shared reveal observer handles the newly visible photo buttons.
    extraPhotos[0].focus({ preventScroll: true });
    extraPhotos[0].scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'center' });
  }
});
