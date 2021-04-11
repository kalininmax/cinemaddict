import { getRandomNumber, getRandomElement, shuffleArray } from './utils';
import { getCommentIds } from './comment';


const TITLES = ['Made for Each Other', 'Popeye meets Sinbad', 'Sagebrush Trail', 'Santa Claus conquers the martians', 'The Dance of Life', 'The Great Flamarion', 'The man with the golden arm'];
const DESCRIPTION = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';
const POSTERS = ['images/posters/made-for-each-other.png', 'images/posters/popeye-meets-sinbad.png', 'images/posters/sagebrush-trail.jpg', 'images/posters/santa-claus-conquers-the-martians.jpg', 'images/posters/the-dance-of-life.jpg', 'images/posters/the-great-flamarion.jpg', 'images/posters/the-man-with-the-golden-arm.jpg'];
const GENRES = ['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Musical'];
const FILMS_COUNTER = 20;
const RATING = { min: 0, max: 10 };
const YEAR = { min: 1900, max: 2021 };
const DURATION = {
  hours: { min: 1, max: 3 },
  mins: { min: 0, max: 59 },
};

const generateGenre = () => {
  return shuffleArray(GENRES).slice(0, getRandomNumber(1, 4));
};

const generateDescription = () => {
  return DESCRIPTION.split(/(?<=\.)\s*(?=[^.])/).slice(0, getRandomNumber(1, 5)).join(' ');
};

const generateDuration = () => {
  return `${getRandomNumber(DURATION.hours.min, DURATION.hours.max)}h ${getRandomNumber(DURATION.mins.min, DURATION.mins.max)}m`;
};

const generateFilm = () => {
  return {
    id: getRandomNumber(0, FILMS_COUNTER),
    comments: getCommentIds(),
    film_info: {
      title: getRandomElement(TITLES),
      rating: getRandomNumber(RATING.min, RATING.max, 1),
      poster: getRandomElement(POSTERS),
      year: getRandomNumber(YEAR.min, YEAR.max),
      duration: generateDuration(),
      genre: generateGenre(),
      description: generateDescription(),
    },
    user_details: {
      watchlist: Boolean(getRandomNumber(0, 1)),
      watched: Boolean(getRandomNumber(0, 1)),
      favorite: Boolean(getRandomNumber(0, 1)),
    },
  };
};

export { generateFilm };
