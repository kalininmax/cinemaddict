const SortType = {
  DEFAULT: 'default',
  DATE_UP: 'date-up',
  DATE_DOWN: 'date-down',
  RATING_UP: 'rating-up',
  RATING_DOWN: 'rating-down',
};

const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites',
};

const MenuItem = {
  ALL_MOVIES: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites',
  STATS: 'stats',
};

const ErrorMessage = {
  COMMENT: 'Пожалуйста, выберите эмоцию и напишите текст комментария',
};

export {
  SortType,
  UserAction,
  UpdateType,
  FilterType,
  MenuItem,
  ErrorMessage
};
