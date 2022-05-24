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

function onFormSubmit(e) {
    e.preventDefault();

    pictureAPIService.resetPage();

    pictureAPIService.request = e.currentTarget.elements.searchQuery.value;

    pictureAPIService.pictureSearch().then(pictures => createMarkup(pictures));

}


function onBtnClick() {
    pictureAPIService.pictureSearch();
}

function createMarkup(picturesArray) {
    const markup = picturesArray.map(picture => {
        return `<div class="photo-card">
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
        </div>`}).join('');
        
    galleryEl.insertAdjacentHTML('beforeend', markup);
}


const gallery = new SimpleLightbox('.gallery a');
gallery.on('show.simplelightbox', function () {
// do something…
});