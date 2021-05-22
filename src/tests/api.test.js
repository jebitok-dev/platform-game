/* eslint-disable no-unused-expressions */

import getScores from '../js/api';

// eslint-disable-next-line no-unused-vars
// const regeneratorRuntime = require('regenerator-runtime');

const responeJSON = {
  result: [
    {
      user: 'John Drew',
      score: 330,
    },
    {
      user: 'Thomas Shelby',
      score: 150,
    },
    {
      user: 'Jackie Chan',
      score: 500,
    },
  ],
};

it('returns the correct object', () => {
  fetch.mockResponse(responeJSON);

  async () => {
    const x = await getScores();
    expect(x).toEqual(responeJSON.result);
  };
});
