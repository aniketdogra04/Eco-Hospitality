import '../shared.js';

const dialog = document.querySelector('#blog-dialog');
const title = document.querySelector('#dialog-title');
const photo = document.querySelector('#dialog-image');
const kind = document.querySelector('#dialog-kind');
const meta = document.querySelector('#dialog-meta');
const description = document.querySelector('#dialog-description');

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
// Preserve existing journal deep links while every card opens the supplied article.
if (['morning', 'lighter', 'food'].includes(new URLSearchParams(location.search).get('story'))) {
  location.replace(new URL('../single-blog.html', import.meta.url).href);
}
