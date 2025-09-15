import axios from 'axios';

const API_KEY = '52265753-7181a70cf6dcebc2c39de477c';
const END_POINT = '/api/';
const PER_PAGE = 15;

axios.defaults.baseURL = 'https://pixabay.com';

export async function getImagesByQuery(query, page = 1) {
  const response = await axios.get(END_POINT, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: PER_PAGE,
    },
  });

  return response.data;
}
