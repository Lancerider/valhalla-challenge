import dotenv from 'dotenv';

dotenv.config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  apiUrl: process.env.API_IMDB_URL,
  apiKey: process.env.API_IMDB_KEY,
};

export default config;
