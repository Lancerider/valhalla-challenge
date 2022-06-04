import { createConnection, getConnection } from '../database/index.js';
import config from '../config/index.js';
import axios from 'axios';

createConnection();

const { apiKey, apiUrl } = config;

const getProductions = async (title) => {
  console.log('Searching Productions');
  console.log('Getting Productions Full Details');

  try {
    const productionsUrl = `${apiUrl}/en/API/AdvancedSearch/${apiKey}?title=${title}&count=10`;
    const response = await axios.get(productionsUrl);

    const apiCalls = [];

    console.log('Getting Productions Details');

    response.data.results.forEach(production => {
      const productionsDetailsUrl = `${apiUrl}/en/API/Title/${apiKey}/${production.id}/FullCast`;
      const apiResponse = axios.get(productionsDetailsUrl);

      apiCalls.push(apiResponse)
    });

    const responses = (await Promise.allSettled(apiCalls))
      .filter(response => response.status === 'fulfilled');

    console.log('Filtering Data');

    const productions = responses
      .map(response => response.value.data)
      .filter(production => {
        const isEpisodeOrMovie = ['Movie', 'TVEpisode'].includes(production.type);
        const productionTitle = production.title ? production.title.toLowerCase() : '';

        return productionTitle.includes(title) || isEpisodeOrMovie;
      })

    return productions;

    } catch (error) {
    console.log(error);

    return [];
  }
}

const updateDatabase = async (productions) => {
  console.log('Saving Data');

  try {
    const db = getConnection();

    db.data.productions = productions;
    db.data.updatedAt = (new Date()).toISOString();

    await db.write();

    console.log('Data Saved');
  } catch (error) {
    console.log('Error Saving Data');
  }
}

const getData = async () => {
  console.log('Getting "viking" productions')
  const vikingProductions = await getProductions('viking');

  console.log('Getting "axe" productions')
  const axeProductions = await getProductions('axe');

  await updateDatabase([...vikingProductions, ...axeProductions]);

  console.log('Scrapping Ended Successfully');
}

getData();
