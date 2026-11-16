# Eco Hospitality

A responsive HTML, CSS and JavaScript website for Himalayan stays and experiences.

## Run locally

From the repository root:

```sh
python -m http.server 8000
```

Open `http://localhost:8000/code/` for the homepage or
`http://localhost:8000/code/destinations/shimla.html` for Shimla.
No build step or package installation is required.

## Structure

- `assets/`: shared images, SVG icons, logos and locally hosted fonts.
- `assets/destinations/shimla/`: imagery specific to the Shimla destination.
- `code/global.css`: design tokens, reset, typography, buttons, navigation, footer and dialogs.
- `code/components.css`: reusable banners, hotel cards, destination cards and FAQs, including responsive styles.
- `code/shared.js`: responsive navigation, section reveals, word animations and number counters. Respects reduced motion.
- `code/index.html`, `code/styles.css`, `code/main.js`: homepage content, layout and booking interactions.
- `code/destinations/shimla.html`, `shimla.css`, `shimla.js`: destination content, layout and interactions.

New destination pages should reuse the global styles, shared components and shared script. Keep page-specific styles beside the page and use the existing spacing, color and typography tokens.

## Shimla design

Source: [Design → New design → Shimla](https://www.figma.com/design/B7vUdTqjIcM2ecKgt4ddSD/ECO-website?node-id=944-6194).

The repeated hotel names, activity descriptions, nearby-place distance badges and church photography follow the supplied design. Hotel pages and live availability remain future work; hotel buttons open a detail dialog, and planning links hand the chosen destination to the existing homepage booking form. Other-destination links similarly lead to that form until those pages exist.

## Wedding page

Open `http://localhost:8000/code/wedding.html`. Page-specific styles and JavaScript live in `code/wedding/`; image and SVG assets live in `assets/wedding/`.

Source: [Design → New design → Wedding](https://www.figma.com/design/B7vUdTqjIcM2ecKgt4ddSD/ECO-website?node-id=1008-9221). Uses the shared site components and animation module. The gallery opens accessible native dialogs. The enquiry form validates the fields and prepares a copyable enquiry and an email draft addressed to `aniket.unmetered@gmail.com`. The guest sends the draft from their own email app; the site does not claim that an enquiry has been sent.

## Dining page

Open `http://localhost:8000/code/dining.html`. Page-specific CSS and JavaScript live in `code/dining/`; its hero and chef photographs live in `assets/dining/`. Shared hotel photos, gallery images and icons are reused.

Source: [Design → New design → Dining](https://www.figma.com/design/B7vUdTqjIcM2ecKgt4ddSD/ECO-website?node-id=1016-11347). Hotel details and gallery photos open accessible dialogs; FAQs use native accordions. Repeated hotel names, gallery imagery and the Shimla FAQ heading follow the supplied design. Shared counter behavior animates numeric facts while preserving text facts such as Local and Daily.
