import refs from './refs';
import NewApiService from './apiService';
import gallery from '../templates/photo-card.hbs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

import InfiniteScroll from 'infinite-scroll';

const { searchForm, btnSearch, galleryRef, btnLoad } = refs;

const pixabayApiService = new NewApiService();

searchForm.addEventListener('submit', onSearch);
btnLoad.addEventListener('click', onLoadMore);
galleryRef.addEventListener('click', e => {
  if (e.target.nodeName !== 'IMG') {
    return;
  }

  e.preventDefault();
  basicLightbox.create(`<img width="1400" height="900" src="${e.target.dataset.src}">`).show();
});

function onSearch(e) {
  e.preventDefault();
  pixabayApiService.query = e.currentTarget.elements.query.value;
  if (pixabayApiService.query.length === 0) {
    btnLoad.classList.add('is-hidden');

    return;
  }
  pixabayApiService.resetPage();
  pixabayApiService.fetchImgCards().then(hits => {
    clearCardsContainer();
    appendCardsMarkup(hits);
    btnLoad.classList.remove('is-hidden');
  });
}

function onLoadMore() {
  pixabayApiService.fetchImgCards().then(hits => {
    appendCardsMarkup(hits);
    galleryRef.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  });
}

function appendCardsMarkup(hits) {
  galleryRef.insertAdjacentHTML('beforeend', gallery(hits));
}

function clearCardsContainer() {
  galleryRef.innerHTML = '';
}

// const infScroll = new InfiniteScroll('.gallery', {
//   // options
//   path() {
//     let pageNumber = (this.loadCount + 1) * 10;
//     return `/articles/P${pageNumber}`;
//   },
// });
