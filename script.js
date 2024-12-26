const unorderedList = document.getElementById("unorderedList");
async function GetPhotos() {
  const Photos = await fetch("https://api.unsplash.com/photos", {
    headers: {
      Authorization: "Client-ID sL4fK8qH8iKKf1yaKGIm8Bgj_ZRDa4rHnswwASCEEqU",
    },
  });
  const data = await Photos.json();
  return data;
}

// async function showPhotos() {
//   const photos = await GetPhotos();
//   photos.forEach((element) => {
//     console.log(element.urls.regular);
//     const listItem = document.createElement("li");
//     const img = document.createElement("img");
//     img.src = element.urls.small;
//     listItem.append(img);
//     unorderedList.append(listItem);
//   });
// }
// showPhotos();
