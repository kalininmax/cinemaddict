import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const humanizeDate = (date, template = 'D MMMM YYYY') => {
  if (template === 'relative') {
    return dayjs().to(date);
  }

  return dayjs(date).format(template);
};

const getHourFromMin = (mins) => {
  return {
    hours: Math.trunc(mins / 60),
    mins: mins % 60,
  };
};

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

const sortFilmDateUp = (filmA, filmB) => {
  const { film_info: { release: { date: dateA } } } = filmA;
  const { film_info: { release: { date: dateB } } } = filmB;
  const weight = getWeightForNullDate(dateA, dateB);

  if (weight !== null) {
    return weight;
  }

  return dayjs(dateA).diff(dayjs(dateB));
};

const sortFilmDateDown = (filmA, filmB) => {
  const { film_info: { release: { date: dateA } } } = filmA;
  const { film_info: { release: { date: dateB } } } = filmB;
  const weight = getWeightForNullDate(dateA, dateB);

  if (weight !== null) {
    return weight;
  }

  return dayjs(dateB).diff(dayjs(dateA));
};

const sortFilmRatingUp = (filmA, filmB) => {
  const { film_info: { rating: ratingA } } = filmA;
  const { film_info: { rating: ratingB } } = filmB;
  return ratingA - ratingB;
};

const sortFilmRatingDown = (filmA, filmB) => {
  const { film_info: { rating: ratingA } } = filmA;
  const { film_info: { rating: ratingB } } = filmB;
  return ratingB - ratingA;
};

export {
  humanizeDate,
  getHourFromMin,
  sortFilmDateUp,
  sortFilmDateDown,
  sortFilmRatingUp,
  sortFilmRatingDown
};
