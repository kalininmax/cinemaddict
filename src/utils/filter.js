import { FilterType } from '../const';

const filter = {
  [FilterType.ALL]: (films) => {
    return films.filter((film) => {
      return film !== null;
    });
  },
  [FilterType.FAVORITES]: (films) => {
    return films.filter(({ userDetails: { favorite } }) => {
      return favorite;
    });
  },
  [FilterType.HISTORY]: (films) => {
    return films.filter(({ userDetails: { watched } }) => {
      return watched;
    });
  },
  [FilterType.WATCHLIST]: (films) => {
    return films.filter(({ userDetails: { watchlist } }) => {
      return watchlist;
    });
  },
};

export { filter };
