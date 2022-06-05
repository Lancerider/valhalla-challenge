import app from './index.js';
import request from 'supertest';


describe('GET /api/productions/vikings', () => {
  let response;

  beforeAll(async () => {
    response = await request(app).get('/api/productions/vikings').send();
  });

  test('Should responde a 200 status code', async () => {
    expect(response.statusCode).toBe(200);
  });

  test('Should have an Array of movies', async () => {
    expect(response.body.movies).toBeInstanceOf(Array);
  });

  test('Should have an Array of episodes', async () => {
    expect(response.body.episodes).toBeInstanceOf(Array);
  });

  test('Should have an Array of directors', async () => {
    expect(response.body.directors).toBeInstanceOf(Array);
  });

  test('Should have the duration', async () => {
    expect(typeof response.body.duration).toBe('string');
  });
});

describe('GET /api/productions/axes', () => {
  let response;

  beforeAll(async () => {
    response = await request(app).get('/api/productions/axes').send();
  });

  test('Should responde a 200 status code', async () => {
    expect(response.statusCode).toBe(200);
  });

  test('Should have an Array of movies', async () => {
    expect(response.body.movies).toBeInstanceOf(Array);
  });

  test('Should have an Array of episodes', async () => {
    expect(response.body.episodes).toBeInstanceOf(Array);
  });

  test('Should have an Array of stars', async () => {
    expect(response.body.stars).toBeInstanceOf(Array);
  });

  test('Should have the duration', async () => {
    expect(typeof response.body.duration).toBe('string');
  });
});
