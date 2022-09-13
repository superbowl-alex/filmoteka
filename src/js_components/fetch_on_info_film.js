const axios = require('axios');

export default class imgApiServise {
  constructor() {
    this.URL1 = 'https://api.themoviedb.org/3/movie';
    this.URL =
      'https://api.themoviedb.org/3/movie/changes?api_key=6308d1a98819d8ffdd4916cbcea5cd95&page=3';
    this.searchQuery = '';
    this.BASE_URL = 'https://api.themoviedb.org/3/collection';
    this.id_film = 155;
    this.KEY = '6308d1a98819d8ffdd4916cbcea5cd95';
  }
  // https://api.themoviedb.org/3/collection/{collection_id}?api_key=<<api_key>>&language=en-US_uk

  async fetchImg() {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${this.id_film}?api_key=${this.KEY}&append_to_response=images&language=uk-UA`
      );

      const data = await JSON.parse(response.request.response);

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  get id() {
    return this.id_film;
  }

  set id(newId_film) {
    this.id_film = newId_film;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
