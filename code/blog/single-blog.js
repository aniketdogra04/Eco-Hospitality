import './blog.js';

const title = document.querySelector('#article-title').textContent.trim();
const url = new URL('single-blog.html', window.location.href).href;
for (const group of document.querySelectorAll('.article-share')) {
  group.querySelector('[data-share-facebook]').href = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url);
  group.querySelector('[data-share-whatsapp]').href = 'https://wa.me/?text=' + encodeURIComponent(title + ' ' + url);
  group.querySelector('[data-share-x]').href = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(title) + '&url=' + encodeURIComponent(url);
  const status = group.querySelector('.share-status');
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      status.textContent = 'Article link copied';
    } catch {
      const input = group.querySelector('.share-url');
      input.hidden = false;
      input.value = url;
      input.focus();
      input.select();
      status.textContent = 'Select and copy the article link';
    }
  }
  group.querySelector('[data-copy-link]').addEventListener('click', copyLink);
  group.querySelector('[data-share]').addEventListener('click', async () => {
    if (!navigator.share) { await copyLink(); return; }
    try { await navigator.share({title, url}); }
    catch (error) { if (error.name !== 'AbortError') await copyLink(); }
  });
}
