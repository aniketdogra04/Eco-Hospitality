import '../shared.js';

const dialog = document.querySelector('#blog-dialog');
const title = document.querySelector('#dialog-title');
const photo = document.querySelector('#dialog-image');
const kind = document.querySelector('#dialog-kind');
const meta = document.querySelector('#dialog-meta');
const description = document.querySelector('#dialog-description');

function openStory(button) {
  const card = button.closest('article');
  const image = card.querySelector('img');
  title.textContent = card.querySelector('h3').textContent.trim().replace(/\s+/g, ' ');
  photo.src = image.src;
  photo.alt = image.alt;
  photo.hidden = false;
  kind.textContent = 'Story preview';
  kind.hidden = false;
  meta.textContent = card.querySelector('.badge').textContent + ' · ' + card.querySelector('time').textContent;
  meta.hidden = false;
  description.textContent = 'The full story is coming soon. Browse the journal for more travel, adventure and food stories.';
  dialog.showModal();
}
for (const button of document.querySelectorAll('[data-story]')) {
  button.addEventListener('click', () => openStory(button));
}
for (const button of document.querySelectorAll('[data-close]')) {
  button.addEventListener('click', () => dialog.close());
}
for (const button of document.querySelectorAll('[data-page]')) {
  button.addEventListener('click', () => {
    title.textContent = button.dataset.page;
    kind.hidden = true;
    photo.hidden = true;
    photo.removeAttribute('src');
    meta.hidden = true;
    description.textContent = 'This link will be connected when the remaining site pages are added.';
    dialog.showModal();
  });
}
// Homepage story links select an existing card; unknown values leave the listing visible.
const selectedStory = new URLSearchParams(window.location.search).get('story');
const selectedButton = [...document.querySelectorAll('[data-story]')].find(button => button.dataset.story === selectedStory);
if (selectedButton) openStory(selectedButton);
