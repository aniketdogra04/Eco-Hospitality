import "./dropdowns.js";

// Native selects and text fields can match :focus-visible after a click.
// Suppress the click/tap outline and restore keyboard focus when tabbing.
document.addEventListener("pointerdown", () => {
  document.documentElement.classList.add("pointer-input");
}, true);
document.addEventListener("keydown", event => {
  if (event.key === "Tab") document.documentElement.classList.remove("pointer-input");
}, true);

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#main-nav");
const mobileNavigation = window.matchMedia("(max-width: 860px)");

function setMenu(open) {
  navigation.classList.toggle("is-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
}

menuToggle.addEventListener("click", () => {
  setMenu(menuToggle.getAttribute("aria-expanded") === "false");
});

navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenu(false);
});

mobileNavigation.addEventListener("change", () => setMenu(false));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    setMenu(false);
    menuToggle.focus();
  }
});

// Reveal sections once as they enter the viewport.
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
if (!reducedMotion.matches && "IntersectionObserver" in window) {
  const existingRevealTargets = document.querySelectorAll(
    ".intro-copy > p, .stats, .section-heading > *, .destination, .listing-card, [data-reveal], " +
    ".experience-photo, .experience-copy > :not(h2), .editorial-copy > :not(h2), " +
    ".editorial-figure, .faq-layout > div > :not(h2), .accordion, .closing-copy > :not(h2)"
  );
  // Reuse the homepage's horizontal reveal for paired image-and-copy sections.
  // Measure before motion classes are applied so reversed grids use their visual side.
  const horizontalPanels = new Map();
  const splitRows = document.querySelectorAll(
    ".hotel-editorial, .chef-section, .wedding-process, .dining-row, .wedding-row, " +
    ".hotel-about-row, .room-row, .story-layout, .value-row, .setting-layout, .experience-card"
  );
  for (const row of splitRows) {
    const panels = [...row.children];
    if (panels.length !== 2) continue;
    const bounds = row.getBoundingClientRect();
    panels.forEach((panel, index) => {
      const rect = panel.getBoundingClientRect();
      const stacked = rect.width > bounds.width * .8;
      const fromLeft = stacked ? index === 0 : rect.left + rect.width / 2 < bounds.left + bounds.width / 2;
      horizontalPanels.set(panel, fromLeft ? "from-left" : "from-right");
    });
  }
  const revealTargets = new Set([...existingRevealTargets, ...horizontalPanels.keys()]);
  const headings = document.querySelectorAll("main h1, main h2, main h3");
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.08 });

  for (const target of revealTargets) {
    // Animate a panel once rather than also sliding its nested paragraphs/buttons.
    let parent = target.parentElement;
    while (parent && !horizontalPanels.has(parent)) parent = parent.parentElement;
    if (parent) continue;
    target.classList.add("reveal");
    if (horizontalPanels.has(target)) {
      target.classList.add(horizontalPanels.get(target));
    } else if (target.matches(".experience-photo, .editorial-wedding .editorial-copy > *, .editorial-dining .editorial-figure")) {
      target.classList.add("from-left");
    } else if (target.matches(".experience-copy > *, .editorial-wedding .editorial-figure, .editorial-dining .editorial-copy > *")) {
      target.classList.add("from-right");
    }
    observer.observe(target);
  }

  for (const heading of headings) {
    const original = heading.textContent.trim().replace(/\s+/g, " ");
    heading.setAttribute("aria-label", original);
    let index = 0;
    const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const node of nodes) {
      const fragment = document.createDocumentFragment();
      for (const part of node.textContent.split(/(\s+)/)) {
        if (!part.trim()) {
          fragment.append(part);
        } else {
          const word = document.createElement("span");
          word.className = "wave-word";
          word.style.setProperty("--word-index", index++);
          word.setAttribute("aria-hidden", "true");
          word.textContent = part;
          fragment.append(word);
        }
      }
      node.replaceWith(fragment);
    }
    heading.classList.add("wave-heading");
    observer.observe(heading);
  }

  const stats = document.querySelector(".stats");
  const counterObserver = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;
    counterObserver.disconnect();
    for (const number of stats.querySelectorAll("dd")) {
      const finalText = number.textContent.trim();
      if (!/^\d+/.test(finalText)) continue;
      const target = parseInt(finalText, 10);
      const suffix = finalText.replace(/^\d+/, "");
      const digits = finalText.match(/^\d+/)[0].length;
      const start = performance.now();
      number.setAttribute("aria-label", finalText);
      function count(now) {
        const progress = Math.min((now - start) / 1400, 1);
        const value = Math.round(target * (1 - Math.pow(1 - progress, 3)));
        number.textContent = String(value).padStart(digits, "0") + suffix;
        if (progress < 1) requestAnimationFrame(count);
      }
      requestAnimationFrame(count);
    }
  }, { threshold: 0.3 });
  if (stats) counterObserver.observe(stats);
  document.documentElement.classList.add("motion-ready");
}
