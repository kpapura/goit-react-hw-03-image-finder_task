// GET https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12

import axios from 'axios';

export const API_KEY = '36251930-42816f081666303cc975e8abf';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const getSearchImgApi = (query, page = 1) => {
  return axios
    .get('https://pixabay.com/api/', {
      params: {
        q: query,
        page,
        key: '36251930-42816f081666303cc975e8abf',
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
      },
    })
    .then(response => {
      const { data } = response;
      return {
        totalHits: data.totalHits,
        images: data.hits.map(({ id, webformatURL, largeImageURL }) => ({
          id,
          webformatURL,
          largeImageURL,
        })),
      };
    });
};
