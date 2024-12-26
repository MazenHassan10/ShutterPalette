const unorderedList = document.getElementById("unorderedList");
const grid = document.querySelector(".grid");
async function GetPhotos() {
  const Photos = await fetch("https://api.unsplash.com/photos", {
    headers: {
      Authorization: "Client-ID sL4fK8qH8iKKf1yaKGIm8Bgj_ZRDa4rHnswwASCEEqU",
    },
  });
  const data = await Photos.json();
  return data;
}

async function showPhotos() {
  const photos = await GetPhotos();
  photos.forEach((element) => {
    console.log(element);
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
showPhotos();
