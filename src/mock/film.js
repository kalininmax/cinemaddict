const TITLES = [
  'Made for Each Other',
  'Popeye meets Sinbad',
  'Sagebrush Trail',
  'Santa Claus conquers the martians',
  'The Dance of Life',
  'The Great Flamarion',
  'The man with the golden arm',
];

const DESCRIPTION = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';

const POSTERS = [
  'images/posters/made-for-each-other.png',
  'images/posters/popeye-meets-sinbad.png',
  'images/posters/sagebrush-trail.jpg',
  'images/posters/santa-claus-conquers-the-martians.jpg',
  'images/posters/the-dance-of-life.jpg',
  'images/posters/the-great-flamarion.jpg',
  'images/posters/the-man-with-the-golden-arm.jpg',
];

const RATING = {
  min: 0,
  max: 10,
};

const YEAR = {
  min: 1900,
  max: 2021,
};

const DURATION = {
  hours: { min: 1, max: 3 },
  mins: { min: 0, max: 59 },
};

const GENRES = ['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Thriller', 'Musical'];

const getRandomNumber = (min, max, afterComma = 0) => {
  if (min < 0 || max < 0) return -1;
  if (min > max) [min, max] = [max, min];
  if (afterComma === 0) return Math.floor(Math.random() * (max - min + 1)) + min;
  return Number.parseFloat((Math.random() * (max - min) + min).toFixed(afterComma));
};

const getRandomElement = (array) => {
  return array[getRandomNumber(0, array.length - 1)];
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const generateDescription = () => {
  return DESCRIPTION.split(/(?<=\.)\s*(?=[^.])/).slice(0, getRandomNumber(1, 5)).join(' ');
};

const generateDuration = () => {
  return `${getRandomNumber(DURATION.hours.min, DURATION.hours.max)}h ${getRandomNumber(DURATION.mins.min, DURATION.mins.max)}m`;
};

const generateGenre = () => {
  return shuffleArray(GENRES).slice(0, getRandomNumber(1, 4));
};

const generateFilm = () => {
  return {
    title: getRandomElement(TITLES),
    description: generateDescription(),
    year: getRandomNumber(YEAR.min, YEAR.max),
    duration: generateDuration(),
    genre: generateGenre(),
    rating: getRandomNumber(RATING.min, RATING.max, 1),
    poster: getRandomElement(POSTERS),
    comments: '',
    isWatchlist: false,
    isWatched: false,
    isFavorite: false,
  };
};

export { generateFilm };
