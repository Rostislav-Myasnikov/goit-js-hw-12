import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = null;

export function createGallery(images) {
  const listEl = document.querySelector('.gallery');

  const markup = images
    .map(
      img => `<li class="gallery-item">
         <div><a href="${img.largeImageURL}">
         <img class="gallery-img" src="${img.webformatURL}" alt="${img.tags}" />
         </a>
         <div class="img-info">
          <div class="info-block"><p>Likes</p><p>${img.likes}</p></div>
          <div class="info-block"><p>Views</p><p>${img.views}</p></div>
          <div class="info-block"><p>Comments</p><p>${img.comments}</p></div>
          <div class="info-block"><p>Downloads</p><p>${img.downloads}</p></div>
        </div>
      </div>
      </li>`
    )
    .join('');

  listEl.insertAdjacentHTML('beforeend', markup);

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a');
  } else {
    lightbox.refresh();
  }
}

export function clearGallery() {
  const listEl = document.querySelector('.gallery');
  listEl.innerHTML = '';
}

export function showLoader() {
  const loader = document.querySelector('.loader');
  loader.style.display = 'block';
}

export function hideLoader() {
  const loader = document.querySelector('.loader');
  loader.style.display = 'none';
}

export function showLoadMoreButton() {
  const moreBtn = document.querySelector('.moreBtn');
  moreBtn.style.display = 'block';
}

export function hideLoadMoreButton() {
  const moreBtn = document.querySelector('.moreBtn');
  moreBtn.style.display = 'none';
}

export function scrollGallery() {
  const firstCard = document.querySelector('.gallery-item');

  if (firstCard) {
    const cardHeight = firstCard.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}
