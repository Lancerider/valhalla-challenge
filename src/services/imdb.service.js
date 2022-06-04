import axios from 'axios';
import boom from '@hapi/boom';

import config from '../config/index.js';

const { apiKey, apiUrl } = config;

class IMDBService {
  static async find(title) {
    try {
      const moviesUrl = `${apiUrl}/en/API/SearchMovie/${apiKey}/${title}`;
      const episodesUrl = `${apiUrl}/en/API/SearchEpisode/${apiKey}/${title}`;

      const moviesCall = axios.get(moviesUrl);
      const episodesCall = axios.get(episodesUrl);

      const apiCalls = [moviesCall, episodesCall];
      const apiResponse = await Promise.all(apiCalls);

      const response = {
        movies: apiResponse[0].data.results,
        episodes: apiResponse[1].data.results,
      };

      return response;
    } catch (error) {
      throw boom.serverUnavailable('Ups, something went wrong. Try later.');
    }
  }

  static async findMovieData(id) {
    try {
      const apiCallUrl = `${apiUrl}/en/API/Title/${apiKey}/${id}/FullCast`;

      const apiResponse = await axios.get(apiCallUrl);

      const { data } = apiResponse;

      return data;
    } catch (error) {
      throw boom.serverUnavailable('Ups, something went wrong. Try later.');
    }
  }

  static async findDirectors(id) {
    try {
      const data = await IMDBService.findMovieData(id);

      // Some results doesn't have info on directorsList
      const directors = data.fullCast.directors.items;

      return {
        id,
        movie: data.title,
        directors,
      };
    } catch (error) {
      console.log(error);
      throw boom.serverUnavailable('Ups, something went wrong. Try later.');
    }
  }

  static async findActors(id) {
    try {
      const apiCallUrl = `${apiUrl}/en/API/Title/${apiKey}/${id}/FullCast`;

      const apiResponse = await axios.get(apiCallUrl);

      return {
        id,
        movie: apiResponse.data.title,
        directors: apiResponse.data.directorList,
      };
    } catch (error) {
      throw boom.serverUnavailable('Ups, something went wrong. Try later.');
    }
  }
}

export default IMDBService;
