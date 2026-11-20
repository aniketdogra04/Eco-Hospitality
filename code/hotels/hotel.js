import { openDatePicker } from "../dropdowns.js";
import '../shared.js';
import { initGuestStories } from '../testimonials.js';

if (document.querySelector('.review-card')) initGuestStories();

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const booking = document.querySelector('#booking');
const dateDialog = document.querySelector('#date-dialog');
const dateForm = document.querySelector('#date-form');
const checkIn = dateForm?.elements.checkin;
const checkOut = dateForm?.elements.checkout;
const range = document.querySelector('#date-range');
const dialog = document.querySelector('#hotel-dialog');
const title = document.querySelector('#dialog-title');
const description = document.querySelector('#dialog-description');
const photo = document.querySelector('#dialog-image');
const summary = document.querySelector('#enquiry-summary');
const actions = document.querySelector('#dialog-actions');
const draft = document.querySelector('#email-draft');
const roomEnquiry = document.querySelector('#room-enquiry');
const status = document.querySelector('#copy-status');
let selectedDates = null;
let selectedRoom = booking?.dataset.roomName || '';
let awaitingEnquiry = false;

for (const button of document.querySelectorAll('[data-close]')) {
  button.addEventListener('click', () => button.closest('dialog').close());
}
document.querySelector('[data-site-menu]').addEventListener('click', () => document.querySelector('#site-menu').showModal());

export function localDate(date) {
  return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-');
}
function nextDay(value) {
  const date = new Date(value + 'T12:00:00');
  date.setDate(date.getDate() + 1);
  return localDate(date);
}
function formatDate(value) { return value.split('-').reverse().join('/'); }
function syncCheckout() {
  checkOut.min = nextDay(checkIn.value || checkIn.min);
  if (checkOut.value && checkOut.value < checkOut.min) checkOut.value = '';
}
function openDates(forEnquiry = false) {
  awaitingEnquiry = forEnquiry;
  checkIn.min = localDate(new Date());
  checkIn.value = selectedDates?.checkIn || '';
  checkOut.value = selectedDates?.checkOut || '';
  syncCheckout();
  openDatePicker(dateDialog, booking.querySelector('.date-trigger'));
}
booking?.querySelector('.date-trigger')?.addEventListener('click', () => openDates());
checkIn?.addEventListener('change', syncCheckout);
dateForm?.addEventListener('submit', event => {
  event.preventDefault();
  if (!dateForm.reportValidity()) return;
  selectedDates = { checkIn: checkIn.value, checkOut: checkOut.value };
  range.textContent = formatDate(selectedDates.checkIn) + ' - ' + formatDate(selectedDates.checkOut);
  dateDialog.close();
  if (awaitingEnquiry) showEnquiry();
});

export function showDetails(name, text, image, fullPhoto = false) {
  title.textContent = name;
  description.textContent = text;
  photo.hidden = !image;
  photo.toggleAttribute('data-full-photo', fullPhoto);
  if (image) { photo.src = image.src; photo.alt = image.alt; }
  else { photo.removeAttribute('src'); photo.alt = ''; }
  summary.hidden = actions.hidden = roomEnquiry.hidden = true;
  status.textContent = '';
  dialog.showModal();
}
export function prepareEmailEnquiry({ heading, message, details, subject, recipient = 'goldenfern@ecohospitality.in' }) {
  showDetails(heading, message);
  summary.textContent = details;
  summary.hidden = actions.hidden = false;
  draft.href = 'mailto:' + recipient + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(details);
}
function showEnquiry() {
  if (!selectedDates || selectedDates.checkIn < localDate(new Date())) { openDates(true); return; }
  const details = ['Golden Fern Resort — availability enquiry', 'Check-in: ' + formatDate(selectedDates.checkIn), 'Check-out: ' + formatDate(selectedDates.checkOut), 'Room: ' + (selectedRoom || 'Please recommend a room'), '', 'Please confirm availability, the current tariff and booking terms for this stay.'].join('\n');
  prepareEmailEnquiry({
    heading: 'Enquire about your stay',
    message: 'Send your selected dates to goldenfern@ecohospitality.in. The hotel will confirm availability and the current tariff; your stay is confirmed only after the hotel completes your booking.',
    details,
    subject: 'Golden Fern stay enquiry' + (selectedRoom ? ' — ' + selectedRoom : ''),
  });
}
booking?.addEventListener('submit', event => { event.preventDefault(); showEnquiry(); });
for (const button of document.querySelectorAll('[data-room]')) {
  button.addEventListener('click', () => {
    selectedRoom = button.dataset.room;
    showDetails(selectedRoom, button.closest('article').querySelector('.room-description')?.textContent || 'King bed · Valley view · 255 sq. ft.\nFrom ₹5,000 per night, as shown in the resort’s room guide. Ask the hotel to confirm the current tariff and availability for your dates.', button.closest('article').querySelector('img'));
    roomEnquiry.hidden = false;
  });
}
for (const button of document.querySelectorAll('[data-book-room]')) {
  button.addEventListener('click', () => { selectedRoom = button.dataset.bookRoom; showEnquiry(); });
}
roomEnquiry.addEventListener('click', () => { dialog.close(); showEnquiry(); });
draft.addEventListener('click', () => dialog.close());
document.querySelector('#copy-enquiry').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(summary.textContent); status.textContent = 'Enquiry copied.'; }
  catch { status.textContent = 'Select and copy the enquiry details above.'; }
});
for (const button of document.querySelectorAll('[data-gallery]')) {
  button.addEventListener('click', () => {
    const image = button.querySelector('img');
    showDetails('A glimpse of Golden Fern', image.alt, image, true);
  });
}
for (const button of document.querySelectorAll('[data-property]')) {
  button.addEventListener('click', () => showDetails('Shimla, Heaven Resorts', 'Explore our featured Shimla retreats. Contact Eco Hospitality for property recommendations and availability.', button.closest('article').querySelector('img')));
}
for (const button of document.querySelectorAll('[data-page]')) {
  button.addEventListener('click', () => showDetails(button.dataset.page, 'This link will be connected when the remaining site pages are added.'));
}

// Rotate the supplied cards without inventing additional rooms or properties.
for (const carousel of document.querySelectorAll('.card-carousel')) {
  const track = carousel.querySelector('[data-card-track]');
  const announcement = carousel.querySelector('.carousel-status');
  let moving = false;
  async function move(direction) {
    if (moving) return;
    moving = true;
    const distance = track.firstElementChild.getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap);
    let clone = null;
    if (direction < 0) track.prepend(track.lastElementChild);
    if (!reducedMotion.matches && typeof track.animate === 'function') {
      if (direction > 0) {
        clone = track.firstElementChild.cloneNode(true);
        clone.inert = true;
        clone.setAttribute('aria-hidden', 'true');
        clone.removeAttribute('id');
        clone.querySelectorAll('[id]').forEach(node => node.removeAttribute('id'));
        track.append(clone);
      }
      const from = direction > 0 ? 0 : -distance;
      const to = direction > 0 ? -distance : 0;
      try {
        await track.animate([{ transform: `translateX(${from}px)` }, { transform: `translateX(${to}px)` }], { duration: 600, easing: 'cubic-bezier(.22, 1, .36, 1)' }).finished;
      } catch { /* Interrupted animations can settle on the selected card order. */ }
    }
    if (direction > 0) track.append(track.firstElementChild);
    clone?.remove();
    announcement.textContent = 'Showing ' + track.firstElementChild.querySelector('h3').textContent + ' first.';
    moving = false;
    updateCardFocus();
  }
  function updateCardFocus() {
    const bounds = track.parentElement.getBoundingClientRect();
    for (const card of track.children) {
      const box = card.getBoundingClientRect();
      card.inert = box.left >= bounds.right - 1 || box.right <= bounds.left + 1;
    }
  }
  for (const button of carousel.querySelectorAll('[data-carousel-step]')) {
    button.addEventListener('click', () => move(Number(button.dataset.carouselStep)));
  }
  new ResizeObserver(updateCardFocus).observe(track.parentElement);
  updateCardFocus();
}
