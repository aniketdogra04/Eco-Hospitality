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
const content = document.querySelector('.review-content');
const viewport = document.createElement('div');
viewport.className = 'review-viewport';
content.before(viewport);
viewport.append(content);
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let activeStory = 0;
let animations = [];
let outgoing = null;

function finishTransition() {
  for (const animation of animations) animation.cancel();
  animations = [];
  outgoing?.remove();
  outgoing = null;
}

function showStory(index, direction = 0) {
  const nextIndex = (index + stories.length) % stories.length;
  const animate = direction && nextIndex !== activeStory && !reducedMotion.matches && typeof content.animate === 'function';
  finishTransition();
  if (animate) {
    outgoing = content.cloneNode(true);
    outgoing.classList.add('review-outgoing');
    outgoing.setAttribute('aria-hidden', 'true');
    outgoing.removeAttribute('aria-live');
    outgoing.querySelectorAll('[id]').forEach(node => node.removeAttribute('id'));
    viewport.append(outgoing);
  }
  activeStory = nextIndex;
  const story = stories[activeStory];
  content.querySelector('#guest-quote').textContent = story.quote;
  content.querySelector('#guest-name').textContent = story.name;
  content.querySelector('#guest-location').textContent = story.location;
  document.querySelector('#story-count').textContent = String(activeStory + 1).padStart(2, '0') + ' / ' + String(stories.length).padStart(2, '0');
  previous.disabled = next.disabled = stories.length < 2;

  if (animate) {
    const options = { duration: 600, easing: 'cubic-bezier(.22, 1, .36, 1)' };
    const transition = [
      outgoing.animate([
        { transform: 'translateX(0)', opacity: 1 },
        { transform: `translateX(${-direction * 100}%)`, opacity: 0 },
      ], options),
      content.animate([
        { transform: `translateX(${direction * 100}%)`, opacity: 0 },
        { transform: 'translateX(0)', opacity: 1 },
      ], options),
    ];
    animations = transition;
    Promise.all(transition.map(animation => animation.finished)).then(() => {
      // An interrupted transition must not clean up a newer slide.
      if (animations === transition) finishTransition();
    }).catch(() => {}); // Cancellation is expected during rapid navigation.
  }
}
previous.addEventListener('click', () => showStory(activeStory - 1, -1));
next.addEventListener('click', () => showStory(activeStory + 1, 1));
document.querySelector('.review-card').addEventListener('keydown', event => {
  if (stories.length < 2 || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
  event.preventDefault();
  const direction = event.key === 'ArrowLeft' ? -1 : 1;
  showStory(activeStory + direction, direction);
});
reducedMotion.addEventListener('change', () => {
  if (reducedMotion.matches) finishTransition();
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
