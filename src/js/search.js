import refs from './refs';
import NewApiService from './apiService';
import gallery from '../templates/photo-card.hbs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

import '@pnotify/core/dist/BrightTheme.css';

import { alert, notice, info, success, error } from '@pnotify/core';

import InfiniteScroll from 'infinite-scroll';

const { searchForm, btnSearch, galleryRef, btnLoad } = refs;

const pixabayApiService = new NewApiService();

searchForm.addEventListener('submit', onSearch);
btnLoad.addEventListener('click', onLoadMore);
galleryRef.addEventListener('click', onImgClick);

function onSearch(e) {
  e.preventDefault();

  pixabayApiService.query = e.currentTarget.elements.query.value;
  if (pixabayApiService.query.length === 0) {
    btnLoad.classList.add('is-hidden');
    alert({
      title: 'Empty field',
      text: 'Please, enter word!',
      delay: 2000,
      sticker: false,
    });
    return;
  }
  pixabayApiService.resetPage();
  pixabayApiService
    .fetchImgCards()
    .then(hits => {
      clearCardsContainer();

      if (hits.length === 0) {
        error({
          title: 'Invalid title entered',
          text: 'Try to enter your request differently',
          delay: 2000,
          width: '500px',
          sticker: false,
        });
      } else appendCardsMarkup(hits);
      btnLoad.classList.remove('is-hidden');
    })
    .catch(onFetchError);
}

function onLoadMore() {
  pixabayApiService
    .fetchImgCards()
    .then(hits => {
      appendCardsMarkup(hits);
      galleryRef.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    })
    .catch(onFetchError);
}

function appendCardsMarkup(hits) {
  galleryRef.insertAdjacentHTML('beforeend', gallery(hits));
}

function clearCardsContainer() {
  galleryRef.innerHTML = '';
}

function onImgClick(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }

  e.preventDefault();
  basicLightbox.create(`<img width="1400" height="900" src="${e.target.dataset.src}">`).show();
}

function onFetchError() {
  error({
    title: 'Ooooops, something went wrong',
    text: 'Try again later',
    delay: 2000,
    width: '500px',
    sticker: false,
  });
}
// const infScroll = new InfiniteScroll('.gallery', {
//   // options
//   path() {
//     let pageNumber = (this.loadCount + 1) * 10;
//     return `/articles/P${pageNumber}`;
//   },
// });
