const unorderedList = document.getElementById("unorderedList");
const grid = document.querySelector(".grid");
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const currentPage = document.getElementById("currentPage");
const searchForm = document.getElementById("searchForm");
const formSubmitButton = document.getElementById("submitBotton");
// async function GetPhotos() {
//   const Photos = await fetch("https://api.unsplash.com/photos", {
//     headers: {
//       Authorization: "Client-ID sL4fK8qH8iKKf1yaKGIm8Bgj_ZRDa4rHnswwASCEEqU",
//     },
//   });
//   const data = await Photos.json();
//   return data;
// }

async function showPhotos(query = "car") {
  const photos = await getPaginatedSearchPhotos(query);
  console.log(photos);
  photos.results.forEach((element) => {
    const pictureCard = document.createElement("div");
    pictureCard.classList.add("picture-card");
    const pictureDiv = document.createElement("div");
    pictureDiv.classList.add("picture");
    const picture = document.createElement("img");
    picture.src = element.urls.regular;

    const metadataDiv = document.createElement("div");
    metadataDiv.classList.add("picture-metadata");
    const userPicture = document.createElement("img");
    userPicture.src = element.user.profile_image.small;
    const span = document.createElement("span");
    const userName = document.createTextNode(element.user.name);
    pictureDiv.append(picture);
    span.append(userName);
    metadataDiv.append(userPicture, span);
    pictureCard.append(pictureDiv, metadataDiv);
    grid.append(pictureCard);
  });
}
async function getPaginatedPhotos(page) {
  const response = await fetch(
    `https://api.unsplash.com/photos?page=${page}&per_page=20`,
    {
      headers: {
        Authorization: "Client-ID sL4fK8qH8iKKf1yaKGIm8Bgj_ZRDa4rHnswwASCEEqU",
      },
    }
  );
  const data = await response.json();
  const links = response.headers.get("Link").split(",");
  pageRelations = await getPageRelations(response);
  console.log(pageRelations);
  return data;
}
async function getPageRelations(response) {
  const links = response.headers.get("Link").split(",");
  return links.map((link) =>
    link.split("=")[link.split("=").length - 1].slice(1, -1)
  );
}
let pageRelations = [];
let pageCount = 1;

// showPhotos(pageCount);

async function getPaginatedSearchPhotos(query) {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?page=${pageCount}&query=${query}&per_page=20`,
    {
      headers: {
        Authorization: "Client-ID sL4fK8qH8iKKf1yaKGIm8Bgj_ZRDa4rHnswwASCEEqU",
      },
    }
  );
  const data = await response.json();
  pageRelations = await getPageRelations(response);
  console.log(pageRelations);
  return data;
}
// getPaginatedSearchPhotos("cars");

previousButton.addEventListener("click", () => {
  if (pageRelations.includes("prev")) {
    pageCount--;
    grid.innerHTML = "";
    showPhotos();
    currentPage.textContent = pageCount;
  }
});
nextButton.addEventListener("click", () => {
  if (pageRelations.includes("next")) {
    pageCount++;
    grid.innerHTML = "";
    showPhotos();
    currentPage.textContent = pageCount;
  }
});

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  grid.innerHTML = "";
  pageCount = 1;
  showPhotos(searchForm.query.value);
  currentPage.textContent = pageCount;
});
formSubmitButton.addEventListener("click", () => {
  grid.innerHTML = "";
  pageCount = 1;
  showPhotos(searchForm.query.value);
  currentPage.textContent = pageCount;
});
showPhotos();
