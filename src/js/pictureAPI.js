const API_KEY = '27618691-16873fc26bb6498af6bbdd835';
const URL = 'https://pixabay.com/';

export default class PictureApiServise {
    constructor() {
        this.searchRequest = "";
        this.page = 1;
    }


    pictureSearch() {
        console.log(this.page);
        return fetch(`${URL}api/?key=${API_KEY}&q=${this.searchRequest}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=5`)
        .then(res => {
            if (!res.ok) {
                throw new Error(res.status);
            }
            return res.json()
        })
        .then(data => {
            this.page += 1;
            console.log(data);
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