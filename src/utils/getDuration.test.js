import { getDuration } from "./getDuration.js";

describe('Testing getDuration.js', () => {

  test('Should manage custom episodes runtimeMins (PT46M)', async () => {
    const duration = getDuration([
      {
        "type": "TVEpisode",
        "runtimeMins": "PT46M"
      }
    ]);

    expect(duration).toBe('46min');
  });

  test('Should return hours and minutes', async () => {
    const duration = getDuration([
      {
        "type": "Movie",
        "runtimeMins": "46"
      },
      {
        "type": "Movie",
        "runtimeMins": "124"
      }
    ]);

    expect(duration).toBe('2h 50min');
  });

  test('Should return only minutes', async () => {
    const duration = getDuration([
      {
        "type": "Movie",
        "runtimeMins": "24"
      },
      {
        "type": "Movie",
        "runtimeMins": "24"
      }
    ]);

    expect(duration).toBe('48min');
  });

  test('Should return empty', async () => {
    const duration = getDuration([
      {
        "type": "Movie",
        "runtimeMins": null
      },
      {
        "type": "Movie",
        "runtimeMins": ""
      }
    ]);

    expect(duration).toBe('');
  });
});
