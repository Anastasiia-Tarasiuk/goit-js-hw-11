import '../sass/main.scss';
import Notiflix from 'notiflix';
import 'regenerator-runtime/runtime';
import axios from 'axios';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import PictureApiServise from './pictureAPI';

const pictureAPIService = new PictureApiServise;

const formEl = document.querySelector('.search-form');
const loadMoreBtnEl = document.querySelector('.load-more');
const galleryEl = document.querySelector('.gallery');


const lightbox = new SimpleLightbox('.gallery a');

loadMoreBtnEl.hidden = true;

formEl.addEventListener('submit', onFormSubmit);
loadMoreBtnEl.addEventListener('click', onBtnClick);

async function onFormSubmit(e) {
    e.preventDefault();
    
    pictureAPIService.resetPage();
    cleanMarkup();
    loadMoreBtnEl.classList.remove("visible");
    
    pictureAPIService.request = e.currentTarget.elements.searchQuery.value;
    
    try {
        const picturesFromApi = await pictureAPIService.pictureSearch();  
        
        if (pictureAPIService.request !== "") {
            
            const pictureForRender = await createMarkup(picturesFromApi);
            
            // if () {
                loadMoreBtnEl.classList.add("visible");
            // }

            const { height: cardHeight } = document
                .querySelector(".search-form")
                .getBoundingClientRect();
            
            window.scrollBy({
                top: cardHeight,
                behavior: "smooth",
            });
            
            return pictureForRender;
       
        } else {
            Notiflix.Notify.failure(`Nothing to search for!`);
        }

    } catch (error) {
        console.log(error);
    }

 

        // КОД БЕЗ ASYNC/AWAIT
    // if (e.currentTarget.elements.searchQuery.value !== "") {
    //     pictureAPIService.pictureSearch().then(pictures => createMarkup(pictures));

    //     loadMoreBtnEl.classList.add("visible");
       
    // } else {
    //     Notiflix.Notify.failure(`Nothing to search for!`);
    // }



}


async function onBtnClick() {

    const picturesFromApi = await pictureAPIService.pictureSearch();
    const pictureMarkup = await createMarkup(picturesFromApi);
  
    const { height: cardHeight } = document
        .querySelector(".photo-card")            
        .getBoundingClientRect();
            
    window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
    });

    return pictureMarkup;
    
    // КОД БЕЗ ASYNC/AWAIT
    // pictureAPIService.pictureSearch().then(pictures => createMarkup(pictures));
    
    
}

async function createMarkup(picturesArray) {
    const markup = await picturesArray.map(picture => {
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

