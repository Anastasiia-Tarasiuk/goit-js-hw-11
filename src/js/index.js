import '../sass/main.scss';
import Notiflix from 'notiflix';
import 'regenerator-runtime/runtime';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import PictureApiServise from './pictureAPI';

const pictureAPIService = new PictureApiServise;

const formEl = document.querySelector('.search-form');
const loadMoreBtnEl = document.querySelector('.load-more');
const galleryEl = document.querySelector('.gallery');

let picturesOnPage = 0;

const lightbox = new SimpleLightbox('.gallery a');

loadMoreBtnEl.hidden = true;

formEl.addEventListener('submit', onFormSubmit);
loadMoreBtnEl.addEventListener('click', onBtnClick);

async function onFormSubmit(e) {
    e.preventDefault();
    picturesOnPage = 0;
    pictureAPIService.resetPage();
    cleanMarkup();
    loadMoreBtnEl.classList.remove("visible");
    
    pictureAPIService.query = e.currentTarget.elements.searchQuery.value;
    
    try {
        // Об'єкт з серверу
        const picturesFromApi = await pictureAPIService.pictureSearch();
        // Загальна кількість картинок, що віддає сервер
        const totalPictures = await picturesFromApi.totalHits;
        // Масив картинок для розмітки 1 сторінки
        const picturesPerPage = await picturesFromApi.hits;
        
        if (pictureAPIService.request !== "") {
            
            const pictureForRender = await createMarkup(picturesPerPage);          

            if (picturesOnPage === totalPictures) {
                loadMoreBtnEl.classList.remove("visible");
            } else {
                loadMoreBtnEl.classList.add("visible")
            }

            const { height: cardHeight } = document
                .querySelector(".search-form")
                .getBoundingClientRect();
            
            window.scrollBy({
                top: cardHeight,
                behavior: "smooth",
            });
            
            return;
       
        } else {
            Notiflix.Notify.failure(`Nothing to search for!`);
        }
    } catch (error) {
        console.log(error);
    }

}


async function onBtnClick() {
    // // Об'єкт з серверу
    const picturesFromApi = await pictureAPIService.pictureSearch();  
    // // Загальна кількість картинок, що віддає сервер
    const totalPictures = picturesFromApi.totalHits;
    // // Масив картинок для розмітки 1 сторінки
    const picturesPerPage = picturesFromApi.hits;
    // Рендер
    const pictureMarkup = createMarkup(picturesPerPage);

    if ( picturesOnPage === totalPictures) {
        loadMoreBtnEl.classList.remove("visible");
    } 
  
    const { height: cardHeight } = document
        .querySelector(".photo-card")            
        .getBoundingClientRect();
            
    window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
    });

    return pictureMarkup;    
}

function createMarkup(picturesArray) {
    const markup = picturesArray.map(picture => {
        picturesOnPage += 1;
        return `
        <div class="photo-card">
        <a class="card-link" href="${picture.largeImageURL}">
        <img class="card-img" src="${picture.webformatURL}" alt="${picture.tags}" loading="lazy" />
        </a>
        <div class="info">
        <p class="info-item">
        <b>Likes </b>${picture.likes}
        </p>
        <p class="info-item">
        <b>Views </b>${picture.views}
        </p>
        <p class="info-item">
        <b>Comments </b>${picture.comments}
        </p>
        <p class="info-item">
        <b>Downloads </b>${picture.downloads}
        </p>
        </div>
        </div>
        `}).join('');
        
        galleryEl.insertAdjacentHTML('beforeend', markup);

    lightbox.refresh('show.simplelightbox');
}
    
    
function cleanMarkup() {
    galleryEl.innerHTML = "";
}

