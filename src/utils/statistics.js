import dayjs from 'dayjs';
import { RankScore, RankName } from '../const';

const CHART_BAR = {
  TYPE: 'horizontalBar',
  HEIGHT: 50,
  THICKNESS: 24,
  PADDING: 100,
  LABEL_OFFSET: 40,
  LABEL_ALIGN: 'start',
  FONT_SIZE: 20,
  FONT_COLOR: '#fff',
  BG_COLOR: '#ffe800',
};

const filmsToFilterMap = {
  'all-time': (films) => {
    return films.filter(({ userDetails: { watched } }) => {
      return watched;
    });
  },
  today: (films) => {
    return films.filter(({ userDetails: { watchingDate } }) => {
      return new Date(watchingDate) > dayjs().subtract(1, 'day');
    });
  },
  week: (films) => {
    return films.filter(({ userDetails: { watchingDate } }) => {
      return new Date(watchingDate) > dayjs().subtract(7, 'day');
    });
  },
  month: (films) => {
    return films.filter(({ userDetails: { watchingDate } }) => {
      return new Date(watchingDate) > dayjs().subtract(30, 'day');
    });
  },
  year: (films) => {
    return films.filter(({ userDetails: { watchingDate } }) => {
      return new Date(watchingDate) > dayjs().subtract(365, 'day');
    });
  },
};

const getTotalDuration = (films) => {
  if (films.length === 0) {
    return '';
  }

  return films
    .map(({ filmInfo: { runtime } }) => {
      return runtime;
    })
    .reduce((a, b) => {
      return a + b;
    }, 0);
};

const getGenresStatistics = (films) => {
  const genresStatistics = {};

  films
    .reduce((acc, film) => acc.concat(film.filmInfo.genres), [])
    .forEach((genre) => {
      if (genresStatistics[genre]) {
        genresStatistics[genre]++;
        return;
      }
      genresStatistics[genre] = 1;
    });

  return genresStatistics;
};

const getTopGenre = (films) => {
  if (films.length === 0) {
    return '';
  }

  const genresStatistics = getGenresStatistics(films);
  const topGenreStatistics = Object.entries(genresStatistics).sort((a, b) => {
    return b[1] - a[1];
  })[0];

  const topGenreName = topGenreStatistics[0];
  return topGenreName;
};

const getUserRank = (films) => {
  const watchedFilmsCount = films.filter((film) => {
    return film.userDetails.watched;
  }).length;

  if (!watchedFilmsCount) {
    return false;
  }

  if (watchedFilmsCount >= RankScore.NOVICE.MIN && watchedFilmsCount <= RankScore.NOVICE.MAX) {
    return RankName.NOVICE;
  }

  if (watchedFilmsCount >= RankScore.FAN.MIN && watchedFilmsCount <= RankScore.FAN.MAX) {
    return RankName.FAN;
  }

  if (watchedFilmsCount > RankScore.FAN.MAX) {
    return RankName.MOVIE_BUFF;
  }
};

export {
  filmsToFilterMap,
  getTotalDuration,
  getGenresStatistics,
  getTopGenre,
  getUserRank,
  CHART_BAR
};
