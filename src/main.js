import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const btn = document.querySelector('button');
const inputEl = document.querySelector('input');
const formEl = document.querySelector('form');
formEl.addEventListener('submit', e => {
  e.preventDefault();

  const query = e.currentTarget.elements['search-text'].value.trim();
  showLoader();
  getImagesByQuery(query)
    .then(images => {
      if (images.length === 0) {
        return iziToast.show({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
          color: 'red',
        });
      }
      createGallery(images);
    })
    .finally(() => {
      hideLoader();
    });
});
