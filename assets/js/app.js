const result = document.querySelector("#resultado");
const form = document.querySelector("#form");
const page = document.querySelector("#pagination");

const imgxPage = 18;
let totalPages;
let iterador;
let actualPage = 1;
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
  findImages();
}
function findImages() {

  const word = document.querySelector("#input").value;

  const key = "44191097-42a6305f0170543a9e537fd56";
  const url = `https://pixabay.com/api/?key=${key}&q=${word}&per_page=${imgxPage}&page=${actualPage}`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      showImages(result.hits);
      totalPages = calcPages(result.totalHits);
    });
}

function *createPagination(total) {
  for (let i = 1; i <= total; i++) {
    console.log(total)
    yield i;
  }
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
                <span class="views">
                     <i class="ri-eye-fill"></i>
                   <p>${views}</p>
               </span>
               <span class="likes">
                  <i class="ri-heart-fill"></i>
                  <p>${likes}</p>
              </span>
            </div>
             <div class="btn__container">
                <a class="btn" href="${largeImageURL}" target="_blank" rel="noopener noreferrer">Open Image</a>
              </div>
      </div>`;
  });

  while(page.firstChild){
    page.removeChild(page.firstChild)
  }


  printPagination();
}

function calcPages(total){
  return parseInt(Math.ceil(total / imgxPage))
}

function printPagination() {
 
  iterador = createPagination(totalPages);

  while(true){
    const {value, done} = iterador.next();
    if(done)return;

    const button = document.createElement('a')
    button.href="#"
    button.dataset.pages = value;
    button.textContent = value;
    button.classList.add("pagination")

    //navigation
    button.onclick = () => {
      actualPage = value;
     findImages();
    }

    page.appendChild(button)
  }
}
