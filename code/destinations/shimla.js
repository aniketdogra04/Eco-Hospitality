import '../shared.js';

const dialog = document.querySelector('#detail-dialog');
const title = document.querySelector('#detail-title');
const photo = document.querySelector('#detail-image');
const description = document.querySelector('#detail-description');
const booking = document.querySelector('#detail-booking');

for (const button of document.querySelectorAll('[data-close]')) {
  button.addEventListener('click', () => dialog.close());
}
for (const button of document.querySelectorAll('[data-detail], [data-page]')) {
  button.addEventListener('click', () => {
    const card = button.closest('article');
    const isHotel = button.dataset.detail === 'hotel';
    const isActivity = button.dataset.detail === 'activity';
    title.textContent = isHotel ? card.querySelector('h3').textContent
      : isActivity ? button.querySelector('.activity-title').textContent : button.dataset.page;
    const source = (card || button).querySelector('img');
    photo.hidden = !source;
    if (source) { photo.src = source.src; photo.alt = source.alt; }
    else { photo.removeAttribute('src'); photo.alt = ''; }
    description.textContent = isHotel
      ? 'A featured stay in Shimla, Himachal Pradesh. Full property details are planned for a dedicated hotel page.'
      : isActivity ? button.querySelector('.activity-copy > span:last-child').textContent
      : 'This link will be connected when the remaining site pages are added.';
    booking.hidden = !isHotel;
    dialog.showModal();
  });
}
// Carry destination intent to the existing homepage booking form.
for (const link of document.querySelectorAll('a[href*="index.html#booking"]')) {
  const url = new URL(link.href);
  url.searchParams.set('destination', link.dataset.destination || 'Shimla');
  link.href = url.href;
}
