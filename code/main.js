import "./shared.js";

for (const button of document.querySelectorAll("[data-close]")) {
  button.addEventListener("click", () => button.closest("dialog").close());
}

const booking = document.querySelector("#booking");
const destination = booking.elements.destination;
const requestedDestination = new URLSearchParams(window.location.search).get("destination");
if ([...destination.options].some(option => option.value === requestedDestination)) {
  destination.value = requestedDestination;
}
const dateTrigger = booking.querySelector(".date-trigger");
const dateDialog = document.querySelector("#date-dialog");
const dateForm = document.querySelector("#date-form");
const checkIn = dateForm.elements.checkin;
const checkOut = dateForm.elements.checkout;
const dateRange = document.querySelector("#date-range");
const searchResults = document.querySelector("#search-results");
const searchMessage = document.querySelector("#search-message");
const hotels = [...document.querySelectorAll("[data-hotel]")];

let selectedDates = null;

function localDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return [year, month, day].join("-");
}

function nextDay(value) {
  const date = new Date(value + "T12:00:00");
  date.setDate(date.getDate() + 1);
  return localDate(date);
}

function formatDate(value) {
  return value.split("-").reverse().join("/");
}

function syncCheckout() {
  checkOut.min = nextDay(checkIn.value || checkIn.min);
  if (checkOut.value && checkOut.value < checkOut.min) checkOut.value = "";
}

function openDates() {
  checkIn.min = localDate(new Date());
  checkIn.value = selectedDates?.checkIn || "";
  checkOut.value = selectedDates?.checkOut || "";
  syncCheckout();
  dateDialog.showModal();
}

dateTrigger.addEventListener("click", openDates);
checkIn.addEventListener("change", syncCheckout);

dateForm.addEventListener("submit", (event) => {
  event.preventDefault();
  selectedDates = { checkIn: checkIn.value, checkOut: checkOut.value };
  dateRange.textContent = formatDate(selectedDates.checkIn) + " - " + formatDate(selectedDates.checkOut);
  dateDialog.close();
});

booking.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!selectedDates) {
    openDates();
    return;
  }

  const name = destination.value;
  let matches = 0;
  for (const hotel of hotels) {
    const isMatch = hotel.dataset.hotel === name;
    hotel.hidden = !isMatch;
    if (isMatch) matches += 1;
  }
  searchMessage.textContent = matches
    ? "Showing featured hotels in " + name + " for " + dateRange.textContent + ". Live availability will be available when booking is connected."
    : "The homepage currently lists no featured hotels in " + name + ".";
  searchResults.hidden = false;
  searchResults.focus({ preventScroll: true });
  document.querySelector("#hotels").scrollIntoView();
});

document.querySelector("#clear-search").addEventListener("click", () => {
  searchResults.hidden = true;
  for (const hotel of hotels) hotel.hidden = false;
  document.querySelector("#hotels-title").focus({ preventScroll: true });
});

for (const link of document.querySelectorAll("[data-destination]")) {
  link.addEventListener("click", () => {
    destination.value = link.dataset.destination;
  });
}

const detailDialog = document.querySelector("#detail-dialog");
const detailTitle = document.querySelector("#detail-title");
const detailImage = document.querySelector("#detail-image");
const detailDescription = document.querySelector("#detail-description");
const detailBooking = document.querySelector("#detail-booking");

function showDetail({ title, description, image, showBooking = false }) {
  detailTitle.textContent = title;
  detailDescription.textContent = description;
  detailImage.hidden = !image;
  if (image) {
    detailImage.src = image.getAttribute("src");
    detailImage.alt = image.alt;
  } else {
    detailImage.removeAttribute("src");
    detailImage.alt = "";
  }
  detailBooking.hidden = !showBooking;
  detailDialog.showModal();
}

const editorialDetails = {
  wedding: "Explore the setting for your wedding, from intimate ceremonies to milestone gatherings in the mountains.",
  dining: "Discover seasonal menus and flavours shaped by local ingredients and the warmth of Himachal.",
};

for (const button of document.querySelectorAll("[data-detail]")) {
  button.addEventListener("click", () => {
    const kind = button.dataset.detail;
    const section = button.closest("article, .editorial");
    showDetail({
      title: section.querySelector("h2, h3").textContent.trim(),
      image: section.querySelector(".listing-photo img, .editorial-photo img"),
      description: editorialDetails[kind] || (kind === "hotel"
        ? "A featured stay in Shimla, Himachal Pradesh. Full property details are planned for a dedicated hotel page."
        : "The full article is planned for the blog."),
      showBooking: kind === "hotel",
    });
  });
}

for (const button of document.querySelectorAll("[data-page]")) {
  button.addEventListener("click", () => {
    showDetail({
      title: button.dataset.page,
      description: "This link will be connected when the remaining site pages are added.",
    });
  });
}

detailBooking.addEventListener("click", () => {
  destination.value = "Shimla";
  detailDialog.close();
});
