import boom from '@hapi/boom';
import { getConnection } from '../database/index.js';
import { getDuration } from '../utils/getDuration.js';

class IMDBService {
  static findProductions(title) {
    const { productions } = getConnection().data;

    return productions.filter(production => {
      const productionTitle = production.title
        ? production.title.toLowerCase()
        : '';

      return productionTitle.includes(title)
    })
  }

  static async vikings() {
    try {
      const productions = IMDBService.findProductions('viking');

      const episodes = productions.filter(production => (production.type === 'TVEpisode'));
      const movies = productions.filter(production => (production.type === 'Movie'));

      const directors = productions
        .map(production => production.directors)
        .filter(director => director !== "");

      const duration = getDuration(productions);

      return {
        episodes,
        movies,
        directors,
        duration,
      };
    } catch (error) {
      throw boom.serverUnavailable('Ups, something went wrong.');
    }
  }

  static async axes() {
    try {
      const productions = IMDBService.findProductions('axe');

      const episodes = productions.filter(production => (production.type === 'TVEpisode'));
      const movies = productions.filter(production => (production.type === 'Movie'));

      let stars = [];

      productions.forEach(production => {
        if (!production.stars) return;

        const starsArray = production.stars.split(', ')
        stars = [...stars, ...starsArray];
      })

      const duration = getDuration(productions);

      return {
        episodes,
        movies,
        stars,
        duration,
      };
    } catch (error) {
      throw boom.serverUnavailable('Ups, something went wrong.');
    }
  }
}

export default IMDBService;
