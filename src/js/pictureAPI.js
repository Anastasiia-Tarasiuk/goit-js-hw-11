import Notiflix from 'notiflix';

const API_KEY = '27618691-16873fc26bb6498af6bbdd835';
const perPage = 40;
const URL = 'https://pixabay.com/';

export default class PictureApiServise {
    constructor() {
        this.searchRequest = "";
        this.page = 1;
    }


    pictureSearch() {
        console.log(this.page);
        return fetch(`${URL}api/?key=${API_KEY}&q=${this.searchRequest}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${perPage}`)
        .then(res => {
            if (!res.ok) {
                throw new Error(res.status);
            }
            return res.json()
        })
        .then(data => {
            console.log(data);
            if (this.page * perPage >= data.totalHits && data.totalHits !== 0) {
                Notiflix.Notify.warning(`We're sorry, but you've reached the end of search results.`);
            } else if (data.totalHits === 0 ) {
                Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
            } else if (this.page === 1) {
                Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);  
            }
            this.page += 1;
            return data.hits;
        });
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