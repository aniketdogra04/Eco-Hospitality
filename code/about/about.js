import '../shared.js';

// The supplied review is repeated temporarily at the owner’s request.
// Replace the second entry when another approved guest story is available.
const stories = [
  {
    quote: 'The warmth felt genuine from the moment we arrived. Every detail was thoughtful, and the quiet connection to the mountains stayed with us long after we left.',
    name: 'Ravi Kumar',
    location: 'New Delhi',
  },
];
stories.push({ ...stories[0] });
const previous = document.querySelector('#previous-story');
const next = document.querySelector('#next-story');
let activeStory = 0;
function showStory(index) {
  activeStory = (index + stories.length) % stories.length;
  const story = stories[activeStory];
  document.querySelector('#guest-quote').textContent = story.quote;
  document.querySelector('#guest-name').textContent = story.name;
  document.querySelector('#guest-location').textContent = story.location;
  document.querySelector('#story-count').textContent = String(activeStory + 1).padStart(2, '0') + ' / ' + String(stories.length).padStart(2, '0');
  previous.disabled = next.disabled = stories.length < 2;
}
previous.addEventListener('click', () => showStory(activeStory - 1));
next.addEventListener('click', () => showStory(activeStory + 1));
document.querySelector('.review-card').addEventListener('keydown', event => {
  if (stories.length < 2 || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
  event.preventDefault();
  showStory(activeStory + (event.key === 'ArrowLeft' ? -1 : 1));
});
showStory(0);

const dialog = document.querySelector('#about-dialog');
for (const button of document.querySelectorAll('[data-close]')) button.addEventListener('click', () => dialog.close());
for (const button of document.querySelectorAll('[data-page]')) {
  button.addEventListener('click', () => {
    document.querySelector('#dialog-title').textContent = button.dataset.page;
    dialog.showModal();
  });
}
