import axios from 'axios';

export function getImagesByQuery(query) {
  const API_KEY = '52265753-7181a70cf6dcebc2c39de477c';
  const END_POINT = '/api/';
  axios.defaults.baseURL = 'https://pixabay.com';

  return axios
    .get(END_POINT, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(res => {
      return res.data.hits;
    })
    .catch(error => {
      console.error('error:', error);
      return [];
    });
}
