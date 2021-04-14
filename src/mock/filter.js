const filmToFilterMap = {
  all: (films) => films.length,
  watchlist: (films) => films.filter(({ user_details: { watchlist } }) => watchlist).length,
  history: (films) => films.filter(({ user_details: { watched } }) => watched).length,
  favorites: (films) => films.filter(({ user_details: { favorite } }) => favorite).length,
};

const generateFilter = (films) => {
  return Object.entries(filmToFilterMap).map(([filterName, countFilms]) => {
    return {
      name: filterName,
      count: countFilms(films),
    };
  });
};

export { generateFilter };
