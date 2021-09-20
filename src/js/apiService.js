export default class NewApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImgCards() {
    //console.log(this);
    const BASE_URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal';
    const API_KEY = '23479775-7c8a7e565023089f3ce2cecd2';

    return fetch(`${BASE_URL}&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        this.incrementPage();
        return data.hits;
      });
  }

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
