// DOM Elements
const unorderedList = document.getElementById("unorderedList");
const grid = document.querySelector(".grid");
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const currentPage = document.getElementById("currentPage");
const searchForm = document.getElementById("searchForm");
const formSubmitButton = document.getElementById("submitBotton");

// Constants
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
// Fetch and display photos based on search query or default
async function showPhotos(query = "") {
  const photos = await getPaginatedSearchPhotos(query);
  photos.forEach(createPhotoCard);
}

// Create individual photo cards and append them to the grid
function createPhotoCard(photo) {
  const pictureCard = document.createElement("div");
  pictureCard.classList.add("picture-card");

  // Create and append the image for the photo
  const pictureDiv = document.createElement("div");
  pictureDiv.classList.add("picture");
  const picture = document.createElement("img");
  picture.src = photo.urls.regular;

  // Create and append the metadata (user profile)
  const metadataDiv = document.createElement("div");
  metadataDiv.classList.add("picture-metadata");
  const userPicture = document.createElement("img");
  userPicture.src = photo.user.profile_image.small;
  const userName = document.createTextNode(photo.user.name);
  const userNameSpan = document.createElement("span");
  userNameSpan.append(userName);

  // Append metadata and picture to the card
  metadataDiv.append(userPicture, userNameSpan);
  pictureDiv.append(picture);
  pictureCard.append(pictureDiv, metadataDiv);

  grid.append(pictureCard);
}

// Fetch page relations (previous/next page URLs)
async function getPageRelations(response) {
  const links = response.headers.get("Link").split(",");
  return links.map((link) =>
    link.split("=")[link.split("=").length - 1].slice(1, -1)
  );
}

// Set initial state for page relations and page count
let pageRelations = [];
let pageCount = 1;

// Fetch photos for the current page and query (if provided)
async function getPaginatedSearchPhotos(query = "") {
  let response;
  let photos;

  // Determine URL based on whether there's a search query or not
  const url =
    query.length > 0
      ? `https://api.unsplash.com/search/photos?page=${pageCount}&query=${query}&per_page=20`
      : `https://api.unsplash.com/photos?page=${pageCount}&per_page=20`;

  // Fetch the data
  response = await fetch(url, { headers: { Authorization: CLIENT_ID } });
  const data = await response.json();
  photos = query.length > 0 ? data.results : data;

  // Get page relations from response headers
  pageRelations = await getPageRelations(response);
  return photos;
}

// Event listeners for pagination and form submission

// Handle "previous" button click
previousButton.addEventListener("click", () => {
  if (pageRelations.includes("prev")) {
    pageCount--;
    grid.innerHTML = "";
    showPhotos(searchForm.query.value);
    currentPage.textContent = pageCount;
  }
});

// Handle "next" button click
nextButton.addEventListener("click", () => {
  if (pageRelations.includes("next")) {
    pageCount++;
    grid.innerHTML = "";
    showPhotos(searchForm.query.value);
    currentPage.textContent = pageCount;
  }
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

// Initialize the app by showing photos without any search query
showPhotos();
