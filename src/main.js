import { keywords, getRandomKeyword } from "./RandomKeyWordsDB.js";
console.log(getRandomKeyword());
// DOM Elements
const grid = document.querySelector(".grid");
const logo = document.getElementById("Logo");
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const currentPage = document.getElementById("currentPage");
const searchForm = document.getElementById("searchForm");
const formSubmitButton = document.getElementById("submitBotton");
const randomPhotosButton = document.getElementById("RandomPhotosButton");

// Constants
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const pageState = {}; // Will store data per query and page
let isFetchingNextPage = false; // Flag to check if we are fetching the next page
// Fetch and display photos based on search query or default
async function showPhotos(query = "") {
  const photos = await getPaginatedSearchPhotos(query);

  // Create a fragment to hold all photo cards
  const fragment = document.createDocumentFragment();

  // Create photo cards and append them to the fragment
  photos.forEach((photo) => {
    const pictureCard = createPhotoCard(photo);
    fragment.appendChild(pictureCard);
  });
  // Append the fragment to the grid
  grid.appendChild(fragment);
}

// Create individual photo cards and append them to the grid
function createPhotoCard(photo) {
  const pictureCard = document.createElement("div");
  pictureCard.classList.add("picture-card");
  pictureCard.tabIndex = 0;
  // Create and append the image for the photo
  const boxShadow = document.createElement("div");
  boxShadow.classList.add("pic-shadow");
  const pictureDiv = document.createElement("div");
  pictureDiv.classList.add("picture");
  const picture = document.createElement("img");
  picture.src = photo.urls.regular;

  // Create and append the metadata (user profile)
  const metadataDiv = document.createElement("div");
  metadataDiv.classList.add("picture-metadata");
  const userPicture = document.createElement("img");
  userPicture.src = photo.user.profile_image.small;
  const metadataRightSide = document.createElement("div");
  metadataRightSide.classList.add("metadataRightSide");
  const userName = document.createTextNode(photo.user.name);
  const userNameSpan = document.createElement("span");
  userNameSpan.append(userName);
  const downloadLink = document.createElement("a");
  downloadLink.classList.add("download-btn");
  downloadLink.href = photo.links.download;
  downloadLink.download = "photo.jpg";
  downloadLink.textContent = "Download Photo";
  downloadLink.target = "_blank";
  metadataRightSide.append(userNameSpan, downloadLink);

  // Append metadata and picture to the card
  metadataDiv.append(userPicture, metadataRightSide);
  pictureDiv.append(picture);
  pictureCard.append(boxShadow, pictureDiv, metadataDiv);

  return pictureCard;
}

// Set initial state for page count
let pageCount = 1;

// Fetch photos for the current page and query (if provided)
async function getPaginatedSearchPhotos(query = "") {
  // Check if we already have the current page
  if (pageState[query] && pageState[query][pageCount]) {
    !pageState[query][pageCount + 1] ? fetchNextPage(query) : null;
    return pageState[query][pageCount];
  }

  // Fetch the current page from the API
  const url =
    query.length > 0
      ? `https://api.unsplash.com/search/photos?page=${pageCount}&query=${query}&per_page=20`
      : `https://api.unsplash.com/photos?page=${pageCount}&per_page=20`;

  const response = await fetch(url, { headers: { Authorization: CLIENT_ID } });
  const data = await response.json();
  const photos = query.length > 0 ? data.results : data;

  // Initialize the state for this query if it doesn't exist
  if (!pageState[query]) {
    pageState[query] = {};
  }

  // Store the fetched data for the current page
  pageState[query][pageCount] = photos;
  // If we aren't already fetching the next page, start fetching it in the background

  fetchNextPage(query);

  return photos;
}

async function fetchNextPage(query) {
  // Check if the next page has already been fetched for this query
  if (pageState[query] && pageState[query][pageCount + 1]) {
    return; // No need to fetch again
  }

  const nextPage = pageCount + 1;

  // Fetch the next page data
  const url =
    query.length > 0
      ? `https://api.unsplash.com/search/photos?page=${nextPage}&query=${query}&per_page=20`
      : `https://api.unsplash.com/photos?page=${nextPage}&per_page=20`;

  const response = await fetch(url, { headers: { Authorization: CLIENT_ID } });
  const data = await response.json();
  const photos = query.length > 0 ? data.results : data;

  // Store the next page data in the state
  if (!pageState[query]) {
    pageState[query] = {};
  }

  pageState[query][nextPage] = photos;
}

// Event listeners for pagination and form submission

// Handle "previous" button click
previousButton.addEventListener("click", () => {
  if (pageCount > 1) {
    pageCount--;
    grid.innerHTML = "";
    showPhotos(searchForm.query.value);
    currentPage.textContent = pageCount;
  }
});

// Handle "next" button click
nextButton.addEventListener("click", () => {
  pageCount++;
  grid.innerHTML = "";
  showPhotos(searchForm.query.value);
  currentPage.textContent = pageCount;
});

// Handle form submission
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  grid.innerHTML = "";
  pageCount = 1;
  showPhotos(searchForm.query.value);
  currentPage.textContent = pageCount;
});

// Handle button click to initiate search
formSubmitButton.addEventListener("click", () => {
  grid.innerHTML = "";
  pageCount = 1;
  showPhotos(searchForm.query.value);
  currentPage.textContent = pageCount;
});

randomPhotosButton.addEventListener("click", () => {
  grid.innerHTML = "";
  pageCount = 1;
  const randomWord = getRandomKeyword();
  searchForm.query.value = randomWord;
  showPhotos(randomWord);
  currentPage.textContent = pageCount;
});
logo.addEventListener("click", () => {
  grid.innerHTML = "";
  searchForm.query.value = "";
  pageCount = 1;
  showPhotos();
  currentPage.textContent = pageCount;
});
// Initialize the app by showing photos without any search query
showPhotos();
