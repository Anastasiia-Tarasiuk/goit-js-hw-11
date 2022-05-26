import Notiflix from 'notiflix';

const API_KEY = '27618691-16873fc26bb6498af6bbdd835';
const perPage = 40;
const URL = 'https://pixabay.com/';

export default class PictureApiServise {
    constructor() {
        this.searchRequest = "";
        this.page = 1;
    }


    async pictureSearch() {
        console.log(this.page);

        const fetchRequest = await fetch(`${URL}api/?key=${API_KEY}&q=${this.searchRequest}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${perPage}`);
        const response = await fetchRequest.json();
        
        // if (!response.ok) {
        //     throw new Error(response.status);
        // } 
            
            if (this.page * perPage >= response.totalHits && response.totalHits !== 0) {
                Notiflix.Notify.warning(`We're sorry, but you've reached the end of search results.`);
            } else if (response.totalHits === 0 ) {
                Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
            } else if (this.page === 1) {
                Notiflix.Notify.success(`Hooray! We found ${response.totalHits} images.`);
            }
        this.page += 1;
        
        return response.hits;

 
            // КОД БЕЗ ASYNC/AWAIT
        // return fetch(`${URL}api/?key=${API_KEY}&q=${this.searchRequest}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${perPage}`)
        // .then(res => {
        //     if (!res.ok) {
        //         throw new Error(res.status);
        //     }
        //     return res.json()
        // })
        // .then(data => {
        //     console.log(data);
        //     if (this.page * perPage >= data.totalHits && data.totalHits !== 0) {
        //         Notiflix.Notify.warning(`We're sorry, but you've reached the end of search results.`);
        //     } else if (data.totalHits === 0 ) {
        //         Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
        //     } else if (this.page === 1) {
        //         Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
        //     }
        //     this.page += 1;
        //     return data.hits;
        // });
    }
    
    resetPage() {
        this.page = 1;
    }

    get request() {
        return this.searchRequest;
    }

    set request(newRequest) {
        this.searchRequest = newRequest;
    }
}

// const axios = require('axios');

// axios.get(`${URL}api/`, {
//     params: {
//         key: API_KEY,
//         q: this.searchRequest,
//         image_type: photo,
//         orientation: horizontal,
//         safesearch: true,
//         page: this.page,
//         per_page: perPage
//     }
// })
//     .then(data => {
//         console.log(data);
//         if (this.page * perPage >= data.totalHits && data.totalHits !== 0) {
//             Notiflix.Notify.warning(`We're sorry, but you've reached the end of search results.`);
//         } else if (data.totalHits === 0) {
//             Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
//         } else if (this.page === 1) {
//             Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
//         }
//         this.page += 1;
//         return data.hits;
//     })
//     .catch(res => {
//         if (!res.ok) {
//             console.log(error);
//         }
//     })
//     .then(res => {
//         return res.json()
//     });
