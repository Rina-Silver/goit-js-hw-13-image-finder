import gallery from '../templates/photo-card.hbs';
import './apiService.js';
import InfiniteScroll from 'infinite-scroll';

// const infScroll = new InfiniteScroll('.gallery', {
//   // options
//   path() {
//     let pageNumber = (this.loadCount + 1) * 10;
//     return `/articles/P${pageNumber}`;
//   },
// });

const BASE_URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal';
const API_KEY = '23479775-7c8a7e565023089f3ce2cecd2';
let page = 1;

fetch(`${BASE_URL}&q=cat&page=${page}&per_page=12&key=${API_KEY}`)
  .then(res => res.json())
  .then(data => console.log(data.hits));
