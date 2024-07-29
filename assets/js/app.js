const result = document.querySelector("#resultado");
const form = document.querySelector("#form");

window.onload = () => {
  form.addEventListener("submit", checkForm);
};

function checkForm(e) {
  e.preventDefault();

  const searchWord = document.querySelector("#input").value;

  if (searchWord === "") {
    showAlert("busque algo");

    return;
  }
  findImages(searchWord);
}
function findImages(word) {
  const key = "44191097-42a6305f0170543a9e537fd56";
  const url = `https://pixabay.com/api/?key=${key}&q=${word}`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => showImages(result.hits));
}

function showAlert(message) {
  const alertExist = document.querySelector(".alert");
  if (!alertExist) {
    const alert = document.createElement("p");
    alert.classList.add("alert");

    alert.innerHTML = `<strong> Error </error>
                          <span> ${message}</span>`;

    form.appendChild(alert);

    setTimeout(() => {
      alert.remove();
    }, 2000);
  }
}
function showImages(images) {
  while (result.firstChild) {
    result.removeChild(result.firstChild);
  }

  //iterar array
  images.forEach((image) => {
    const { previewURL, likes, views, largeImageURL } = image;

    result.innerHTML += `
      <div class="test">
           <img class="card__image" src="${previewURL}">
            <div class="icons__container">
             
     
            <p>Views</p>
          </span>
            
            </div>
      </div>`;
  });
}
