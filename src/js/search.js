import refs from './refs';
import NewApiService from './apiService';
import gallery from '../templates/photo-card.hbs';

import InfiniteScroll from 'infinite-scroll';

const { searchForm, btnSearch, galleryRef, btnLoad } = refs;
const pixabayApiService = new NewApiService();

searchForm.addEventListener('submit', onSearch);
btnLoad.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  pixabayApiService.query = e.currentTarget.elements.query.value;
  pixabayApiService.resetPage();
  pixabayApiService.fetchImgCards().then(appendCardsMarkup);
}

function onLoadMore() {
  pixabayApiService.fetchImgCards().then(appendCardsMarkup);
}

function appendCardsMarkup(hits) {
  galleryRef.insertAdjacentHTML('beforeend', gallery(hits));
}

// const infScroll = new InfiniteScroll('.gallery', {
//   // options
//   path() {
//     let pageNumber = (this.loadCount + 1) * 10;
//     return `/articles/P${pageNumber}`;
//   },
// });
