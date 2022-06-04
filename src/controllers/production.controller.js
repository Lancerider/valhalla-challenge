import IMDBService from '../services/imdb.service.js';

export const getVikingProductions = async (req, res, next) => {
  try {
    const moviesAndSeriesEpisodes = await IMDBService.find('viking');

    res.status(200).send(moviesAndSeriesEpisodes);
  } catch (error) {
    next(error);
  }
};

export const getAxeProductions = async (req, res, next) => {
  try {
    const moviesAndSeriesEpisodes = await IMDBService.find('axe');

    res.status(200).send(moviesAndSeriesEpisodes);
  } catch (error) {
    next(error);
  }
};
