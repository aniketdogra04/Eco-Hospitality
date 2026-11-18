import '../shared.js';

const dialog = document.querySelector('#policy-dialog');
for (const button of document.querySelectorAll('[data-close]')) {
  button.addEventListener('click', () => dialog.close());
}
for (const button of document.querySelectorAll('[data-page]')) {
  button.addEventListener('click', () => {
    document.querySelector('#dialog-title').textContent = button.dataset.page;
    document.querySelector('#dialog-description').textContent = 'This link will be connected when the remaining site pages are added.';
    dialog.showModal();
  });
}
