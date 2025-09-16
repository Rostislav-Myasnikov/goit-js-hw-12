import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  scrollGallery,
  clearGallery,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('form');
const moreBtn = document.querySelector('.moreBtn');

let currentQuery = '';
let page = 1;
const PER_PAGE = 15;

formEl.addEventListener('submit', async e => {
  e.preventDefault();

  const query = e.currentTarget.elements['search-text'].value.trim();
  if (!query){ 
      iziToast.error({
    title: 'error',
    message: 'Please enter a word to search for.',
    position: 'topRight',
  });
    return;}

  currentQuery = query;
  page = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, page);

    if (data.hits.length === 0) {
      iziToast.show({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        color: 'red',
      });
      return;
    }

    createGallery(data.hits);

    if (data.totalHits > PER_PAGE) {
      showLoadMoreButton();
    } else {iziToast.info({
  title: 'End of Results',
  message: "We're sorry, but you've reached the end of search results.",
  position: 'topRight',
});
}
  } catch (error) {
    console.error('error:', error);
    iziToast.error({
      message: `We're sorry, but you've reached the end of search results.`,
      position: 'topRight',
      color: 'red',
    });
  } finally {
    hideLoader();
  }
});

moreBtn.addEventListener('click', async () => {
  page += 1;
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, page);
    createGallery(data.hits);

    scrollGallery();

    if (page * PER_PAGE >= data.totalHits) {
      hideLoadMoreButton();
      iziToast.info({
  title: 'End of Results',
  message: "We're sorry, but you've reached the end of search results.",
  position: 'topRight',
});

    }
  } catch (error) {
    console.error('Load more error:', error);
    iziToast.error({
      title: 'Error',
      message: 'Failed to load more images.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});
