import { FilterType } from '../const';

const filter = {
  [FilterType.ALL]: (films) => films.filter((film) => film !== null),
  [FilterType.FAVORITES]: (films) => films.filter(({ user_details: { favorite } }) => favorite),
  [FilterType.HISTORY]: (films) => films.filter(({ user_details: { watched } }) => watched),
  [FilterType.WATCHLIST]: (films) => films.filter(({ user_details: { watchlist } }) => watchlist),
};

export { filter };
