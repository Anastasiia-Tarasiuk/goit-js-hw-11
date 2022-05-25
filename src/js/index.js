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

formEl.addEventListener('submit', onFormSubmit);
loadMoreBtnEl.addEventListener('click', onBtnClick);

loadMoreBtnEl.hidden = true;

function onFormSubmit(e) {
    e.preventDefault();
    
    pictureAPIService.resetPage();
    cleanMarkup();
    loadMoreBtnEl.hidden = true;

    pictureAPIService.request = e.currentTarget.elements.searchQuery.value;

    if (e.currentTarget.elements.searchQuery.value !== "") {
        pictureAPIService.pictureSearch().then(pictures => createMarkup(pictures));
        
        loadMoreBtnEl.hidden = false;
       
    } else {
        Notiflix.Notify.failure(`Nothing to search for!`);
    }


}


function onBtnClick() {
    pictureAPIService.pictureSearch().then(pictures => createMarkup(pictures));
    
    
}

function createMarkup(picturesArray) {
    const markup = picturesArray.map(picture => {
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

    const lightbox = new SimpleLightbox('.gallery a');
    lightbox.on('show.simplelightbox');
    // lightbox.refresh();
}


function cleanMarkup() {
    galleryEl.innerHTML = "";
}

