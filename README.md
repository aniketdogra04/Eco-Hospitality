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

## About page

Open `http://localhost:8000/code/about.html`. Page-specific CSS and JavaScript live in `code/about/`; new imagery and review icons live in `assets/about/`. Existing hotel imagery and the mountain banner are shared.

Source: [Design → New design → About](https://www.figma.com/design/B7vUdTqjIcM2ecKgt4ddSD/ECO-website?node-id=1028-7866). Reuses the shared navigation, footer, typography, buttons and animations. The guest-story carousel supports previous/next and arrow keys, announces changes, and repeats the supplied review in its second slot at the owner’s request. Update the `stories` entries in `about.js` when another review is available.

## Contact page

Open `http://localhost:8000/code/contact.html`. Page-specific CSS and JavaScript live in `code/contact/`; contact icons live in `assets/contact/`. The botanical hero is shared with About, and enquiry field styles are shared with Wedding.

Source: [Design → New design → Contact](https://www.figma.com/design/B7vUdTqjIcM2ecKgt4ddSD/ECO-website?node-id=1064-6942). Phone and email links are actionable; an interactive Google Maps embed uses the displayed office address, with a separate link to open the exact address search in Google Maps. The contact form validates details and prepares an email draft to `sales@ecohospitality.in`, as selected by the owner. The guest sends the message through their own email app. Social buttons retain the existing site's placeholder dialog until profile URLs are supplied.

The updated “Choose where the conversation begins” section reuses shared typography, badges, links and scroll reveals. Its three cards focus the enquiry form and label the email draft as a stay, celebration or partnership/press/career enquiry, preserving any message already entered. The section uses the sage background from the updated design; the map section uses the paper background while retaining the requested interactive map.

## Blog page

Open `http://localhost:8000/code/blog.html`. Page-specific CSS and JavaScript live in `code/blog/`; the exact story-photo crops live in `assets/blog/`. The botanical hero, card components and animation module are shared with the rest of the site.

Source: [Design → New design → Blogs](https://www.figma.com/design/B7vUdTqjIcM2ecKgt4ddSD/ECO-website?node-id=1065-8625). All nine cards preserve the supplied order, categories, titles and dates. Read-story buttons open accessible previews; full article bodies were not supplied. The homepage links can open a matching preview with `?story=morning`, `?story=lighter` or `?story=food`; unknown values leave the listing visible. Replace the preview content or route these buttons to full article pages when article copy is available.
