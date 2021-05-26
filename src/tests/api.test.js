const { default: api } = require('../js/api');

it('Return score', async () => {
  fetch.mockResponseOnce(JSON.stringify({
    result: [
      {
        user: 'Jebitok',
        score: 20000,
      }],
  }));
  const res = await api.ScoreList();
  expect(res).toEqual({ result: [{ score: 20000, user: 'Jebitok' }] });
  expect(fetch.mock.calls.length).toEqual(1);
});

it('Does not return score', async () => {
  fetch.mockResponseOnce(JSON.stringify({
    result: [
      {
        user: 'Jebitok',
        score: 20000,
      }],
  }));
  const err = await api.ScoreList();
  expect(err).not.toEqual({ result: [{ score: 2000, user: 'Jebitok' }] });
  expect(fetch.mock.calls.length).not.toEqual(1);
});

test('Return value for POST action', () => {
  fetch.mockResponseOnce(JSON.stringify([{ result: 'Leaderboard score created correctly.' }]));
  const onResponse = jest.fn();
  const onError = jest.fn();

  return api.submit()
    .then(onResponse)
    .catch(onError)
    .finally(() => {
      expect(onResponse).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();
      expect(onResponse.mock.calls[0][0][0]).toEqual({ result: 'Leaderboard score created correctly.' });
    });
});

test('Test description', () => {
  const t = () => {
    throw new TypeError();
  };

  expect(t).toThrow(TypeError);
});