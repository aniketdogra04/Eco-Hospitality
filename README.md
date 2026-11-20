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
- `code/testimonials.css`, `code/testimonials.js`: the shared guest-story carousel, including smooth transitions and reduced-motion support.
- `code/hotels/`: hotel pages and shared hotel layouts/interactions; property assets live in `assets/hotels/`.
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

## Hotel homepage — Golden Fern Resort

Open `http://localhost:8000/code/hotels/golden-fern.html`. Hotel-specific CSS and JavaScript live beside it in `code/hotels/`. Amenity icons are shared in `assets/hotels/icons/`; new property photos and the map live in `assets/hotels/golden-fern/`. Existing hotel, wedding, gallery, arrow and logo assets are reused. Golden Fern footer links throughout the site open this page.

Source: [Design → New design → Hotel - Homepage](https://www.figma.com/design/B7vUdTqjIcM2ecKgt4ddSD/ECO-website?node-id=1071-12042). Reuses global typography, spacing, animation, booking, gallery, FAQ and guest-story components. The hotel navigation targets sections on this page; Experiences opens the existing site section, and the desktop menu opens the corporate navigation. Rooms & suites has a dedicated page; the remaining hotel subpages are future work.

Room and property carousels rotate the three supplied cards. Gallery photos open accessible dialogs. The two guest-story slots repeat the supplied review, following the owner's existing preference. Repeated room photographs, prices, property names, “Dinning” navigation label and the wedding section's dining copy follow the supplied frame.

The date picker validates arrival and departure dates, then prepares a copyable email draft to the design's hotel address, `goldenfern@ecohospitality.in`, including the selected room when requested. The visitor sends it through their email app; live room inventory and checkout are not connected. Phone, email, wedding enquiry and Google Maps links are actionable. The map preserves the design's static image and opens the hotel location in Google Maps.

## Hotel rooms and suites

Open `/code/hotels/golden-fern-rooms.html`. Source: [Hotel - Rooms & suites](https://www.figma.com/design/B7vUdTqjIcM2ecKgt4ddSD/ECO-website?node-id=1079-13996). Uses the shared hotel navigation, booking bar, date picker, enquiries and animations; page-specific layouts live in `code/hotels/rooms.css`. The hotel homepage room cards and navigation link to the listing and its room anchors.

All four photos and the comparison table follow Figma. Repeated feature chips (255 sq. ft. / valley view) and the “Distinct seasons” stat preserve the supplied design, even where its descriptive copy and comparison table give different details. “Know more” opens a room preview; “Book now” prepares an email enquiry for that room and chosen dates to `goldenfern@ecohospitality.in`. The Classic Room has a dedicated detail page; live inventory and other single-room pages remain future work. The comparison table scrolls horizontally on small screens.

## Hotel single room — Classic Room

Open `/code/hotels/golden-fern-classic.html`. Source: [Hotel - Single room](https://www.figma.com/design/B7vUdTqjIcM2ecKgt4ddSD/ECO-website?node-id=1084-17171). The supplied frame describes the Classic Room. Its homepage card and listing “Know more” link open this detail page; other room categories keep their own listing anchors.

The page reuses hotel chrome, booking/date validation, gallery dialogs, card carousels and animations. Room copy styles are shared in `hotel.css`; the detail layout lives in `single-room.css`. Both “Book now” buttons and the availability form prepare an email enquiry for the Classic Room to `goldenfern@ecohospitality.in`. No booking is confirmed or email sent by the site.

The exact portrait, gallery and recommendation photo crops are local assets. Repeated gallery images, the duplicated executive photo, recommendation titles and conflicting feature chips/descriptive room sizes follow Figma. “Other rooms” cards are fully clickable, with accessible names indicating their actual destination.

## Hotel dining — Golden Fern Resort

Open `/code/hotels/golden-fern-dining.html`. Source: [Hotel - Dining](https://www.figma.com/design/B7vUdTqjIcM2ecKgt4ddSD/ECO-website?node-id=1084-18155). Uses shared hotel navigation, stay/date enquiries, gallery dialogs and scroll animations. The Dining navigation entry on all implemented hotel pages opens this page. Page-specific styles and table enquiries live in `code/hotels/dining.css` and `dining.js`. New photo crops live in `assets/hotels/golden-fern/`; all eight gallery assets are reused.

Both “Book your table” buttons open the same enquiry form. It validates name, email, date, time and guest count, preserves entered details, and prepares a copyable email draft to `goldenfern@ecohospitality.in`. The visitor sends the draft from their email app; the restaurant confirms availability. Stay availability remains the existing separate hotel enquiry flow.

The hero spelling (“Dinning”, “fern reosrt”), reused stay description, pasta photograph in the traditional-cuisine section, and mixed gallery imagery preserve the supplied Figma frame.

## Hotel wedding — Golden Fern Resort

Open `/code/hotels/golden-fern-wedding.html`. Source: [Hotel - Wedding](https://www.figma.com/design/B7vUdTqjIcM2ecKgt4ddSD/ECO-website?node-id=1092-19283). The page reuses hotel navigation, stay/date enquiries, service rows, gallery dialogs, FAQs and the smooth guest-story carousel. All implemented hotel pages link to Wedding; the homepage wedding button links to its planning section. Page layouts and enquiries live in `code/hotels/wedding.css` and `wedding.js`; exact new photo crops live in `assets/hotels/golden-fern/`.

Wedding buttons and the coordination card open a shared, validated enquiry form. The accommodation card opens Rooms & Suites. The form preserves entered details and prepares a copyable email draft to the property's existing address, `goldenfern@ecohospitality.in`. The visitor sends the draft from their email app; the hotel confirms availability. Corporate wedding enquiries retain their separately configured recipient.

The reused stay description, cuisine copy in “Why shimla”, service text, gallery images, supplied capacity figures and “Weeding” heading follow the Figma frame. “Read more” jumps to the detailed venue section. The two guest-story slots repeat the supplied review as requested.

## Hotel About — Golden Fern Resort

Open `/code/hotels/golden-fern-about.html`. Source: [Hotel - About](https://www.figma.com/design/B7vUdTqjIcM2ecKgt4ddSD/ECO-website?node-id=1106-10158). All implemented hotel navigation About entries open this page. Page-specific layouts live in `code/hotels/about.css`; shared `hotel.js` provides navigation, date validation, stay enquiry drafts and the smooth guest-story carousel. “Discover our story” jumps to the hotel's introduction.

The botanical hero, logos, arrows, review assets and three experience icons are reused. Exact new photo crops live in `assets/hotels/golden-fern/`; the bed icon lives beside shared hotel icons. The hero's dining eyebrow, repeated experience descriptions, room count/location wording and static seasonal temperature follow the supplied frame, including differences from the other property pages. Both guest-story slots repeat the supplied review as previously requested. Stay enquiries use `goldenfern@ecohospitality.in` through the visitor's email app; the site does not confirm live availability.

## Hotel gallery — Golden Fern Resort

Open `/code/hotels/golden-fern-gallery.html`. Source: [Hotel - Gallery](https://www.figma.com/design/B7vUdTqjIcM2ecKgt4ddSD/ECO-website?node-id=1096-8967). All hotel navigation Gallery links open this page. It preserves the nine supplied photo crops and their order, with the shared botanical hero, navigation, footer, photo buttons and scroll animations. High-resolution image-only exports live in `assets/hotels/golden-fern/gallery-1.png` through `gallery-9.png`.

`gallery.css` provides the responsive grid; `gallery.js` composes the shared hotel dialog behavior with previous/next photo buttons, arrow keys and an announced photo count. Escape closes the dialog and returns focus to its photo. “Show more” reveals nine additional existing Golden Fern images from the site's property pages, announces the count and focuses the first new photo. “Show less” restores the supplied nine-photo grid. The shared hotel module supports pages without a booking bar; existing stay enquiries keep their previous behavior.

## Hotel Contact — Golden Fern Resort

Open `/code/hotels/golden-fern-contact.html`. Source: [Hotel - Contact](https://www.figma.com/design/B7vUdTqjIcM2ecKgt4ddSD/ECO-website?node-id=1120-8464). All hotel Contact navigation entries open this page. It reuses the corporate Contact layout, fields, icons and botanical hero, with shared hotel chrome, dialogs and scroll animations. Hotel-specific overrides and form behavior live in `code/hotels/contact.css` and `contact.js`.

The form validates required details, rejects whitespace-only names/messages and invalid phone numbers, and prepares a copyable email draft to `sales@ecohospitality.in`, as shown in the frame and previously selected for Contact enquiries. Details remain in the form after closing the review. The site does not send email automatically. The shared email helper accepts a recipient while preserving its default property address for stay, wedding and table enquiries.

The frame's corporate office address, phone and sales email are preserved; an accidental trailing ‘v’ is removed from the hero copy. The address link opens that office address in Google Maps. The exact new map crop (`assets/hotels/golden-fern/contact-map.png`) shows Golden Fern Resort and opens the property location already used on the hotel homepage. Social buttons retain the site's placeholder dialogs until profile URLs are supplied.

## Hotel Experiences — Golden Fern Resort

Open `/code/hotels/golden-fern-experiences.html`. Source: [Hotel - Experiences](https://www.figma.com/design/B7vUdTqjIcM2ecKgt4ddSD/ECO-website?node-id=1131-10012). All hotel Experiences navigation entries open this page. Page layouts and actions live in `code/hotels/experiences.css` and `experiences.js`. The botanical hero, hotel chrome, typography, action icons, dialogs and scroll animations are shared. The exact spa crop is stored once in `assets/hotels/golden-fern/experience-spa.png` and reused in the four supplied slots.

The frame supplies four repeated “The Spa” cards with placeholder descriptions. Those cards and their order are preserved pending final content. “Know more” opens the dedicated Spa detail page. No additional experience entries were supplied, so “Show more” opens a dialogue directing the visitor to ask the team about available experiences; it does not invent further offers or duplicate more cards.

Known `?experience=spa` and `?experience=more` links prefill the Hotel Contact message with the relevant enquiry while preserving any existing text. Other values leave the form untouched. The visitor reviews and sends an email draft to Contact's existing `sales@ecohospitality.in` recipient; no email is sent automatically. The reusable hotel detail helper is exported for this page without changing existing booking or gallery behavior.

## Hotel Experiences single — The Spa

Open `/code/hotels/golden-fern-spa.html`. Source: [Hotel - Experiences single](https://www.figma.com/design/B7vUdTqjIcM2ecKgt4ddSD/ECO-website?node-id=1173-8759). All four supplied Spa listing cards now have native “Know more” links to this page. The header keeps Experiences selected and links back to its listing. Spa-specific layouts live in `code/hotels/spa.css`; `hotel.js` supplies carousels, gallery dialogs, menus and shared animations.

The exact hero, two treatment images and recommendation crop are local `assets/hotels/golden-fern/spa-*.png` assets. Image controls rotate the two photos, which open accessible full-photo dialogs. Related experience cards are clickable throughout and return to the corresponding entries in the listing; the design supplies three repeated Spa recommendations. FAQs use the shared native accordion; the experience-booking answer links to the existing Spa enquiry on Hotel Contact.

Duration, timings and the starting price follow Figma. The reused room description in the hero, wedding copy in the Spa introduction and placeholder recommendation text are retained from the supplied frame pending final copy. No extra services, prices or booking guarantees are inferred.

## Footer policy pages — Eco Hospitality

The three shared policy pages are `/code/terms-and-conditions.html`, `/code/cancellation-refund-policy.html` and `/code/privacy-policy.html`. Their source frames beside Blogs are [Terms and Conditions](https://www.figma.com/design/B7vUdTqjIcM2ecKgt4ddSD/ECO-website?node-id=1173-9471), [Cancellation & Refund Policies](https://www.figma.com/design/B7vUdTqjIcM2ecKgt4ddSD/ECO-website?node-id=1173-10099) and [Privacy Policy](https://www.figma.com/design/B7vUdTqjIcM2ecKgt4ddSD/ECO-website?node-id=1173-10528).

All Eco Hospitality and Individual hotel footers link to these same pages, with relative paths for nested routes. Policy layouts and shared behavior live in `code/policies/`; the exact shared banner crop lives in `assets/policies/hero.png`. The supplied policy wording, emphasis, lists and external references are preserved. Semantic section headings and lists support screen readers; long headings and links wrap on mobile. The Terms page's Privacy Policy reference links to the new Privacy page. Contact email and phone links in the cancellation policy remain actionable.

### Shared dropdowns

`code/dropdowns.js` implements the [Dropdown Components](https://www.figma.com/design/B7vUdTqjIcM2ecKgt4ddSD/ECO-website?node-id=1209-9811) and is loaded through `shared.js`. Header Hotels and Destinations open on mouse hover without chevrons, with a short dismissal delay to allow travel into the menu; keyboard and touch users can still open them. They use the same compact list styling as the homepage destination picker. The original destination select remains the booking form's value and validation source. Golden Fern opens its property page; hotels without dedicated pages link to the corresponding destination's existing hotel listing.

The shared single-month calendar is opened by the homepage and Individual hotel booking modules. It uses real weekday alignment, disables past dates, supports month navigation and keyboard arrows, and applies a stay after selecting check-in and a later check-out. While choosing checkout, hovering or focusing dates previews a continuous light range behind the green endpoints; the same connected range is restored when reopening a saved stay. It submits the existing date form so search and hotel enquiry behavior remain connected. Dropdowns close on Escape, outside interaction or focus leaving the control, and remain within the viewport on small screens.
