import axios from 'axios';
import { renderGallery } from '../index';
import { Notify } from 'notiflix';

export class PixabayAPI {
  BASE_URL = 'https://pixabay.com/api/';
  API_KEY = '30133955-e93b745f17ab182f6d1d38be9';

  searchParams = new URLSearchParams({
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 40;
  }

  async getImages() {
    const url = `${this.BASE_URL}?key=${this.API_KEY}&q=${this.searchQuery}&${this.searchParams}&page=${this.page}&per_page=${this.per_page}`;
    try {
      const response = await axios.get(url);
      const render = renderGallery(response.data.hits);
      console.log(response.data);
      this.page += 1;
      return response.data;
    } catch (error) {
      console.log(error.message);
      Notify.warning(
        `We're sorry, but you've reached the end of search results.`
      );
      return;
    }
  }
  startPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
