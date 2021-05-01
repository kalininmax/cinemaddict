import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { getRandomNumber, getRandomElement, shuffleArray } from '../utils/common';
import { getCommentIds } from './comment';

const TITLES = ['Made for Each Other', 'Popeye meets Sinbad', 'Sagebrush Trail', 'Santa Claus conquers the martians', 'The Dance of Life', 'The Great Flamarion', 'The man with the golden arm'];
const DESCRIPTION = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';
const POSTERS = ['images/posters/made-for-each-other.png', 'images/posters/popeye-meets-sinbad.png', 'images/posters/sagebrush-trail.jpg', 'images/posters/santa-claus-conquers-the-martians.jpg', 'images/posters/the-dance-of-life.jpg', 'images/posters/the-great-flamarion.jpg', 'images/posters/the-man-with-the-golden-arm.jpg'];
const GENRES = ['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Musical'];
const RATING = { min: 0, max: 10 };
const AGE_RATING = ['0+', '6+', '12+', '16+', '18+'];
const DIRECTORS = ['Stanley Kubrick', 'Alfred Hitchcock', 'Akira Kurosawa', 'Steven Spielberg', 'Martin Scorsese', 'Quentin Tarantino', 'Ingmar Bergman'];
const WRITERS = ['Quentin Tarantino', 'William Goldman', 'Charlie Kaufman', 'Woody Allen', 'Nora Ephron', 'Ernest Lehman', 'Oliver Stone'];
const ACTORS = ['Cary Grant', 'Marlon Brando', 'James Stewart', 'Marilyn Monroe', 'Charlie Chaplin', 'Gene Kelly', 'Sophia Loren'];
const COUNTRIES = ['USA', 'Canada', 'France', 'Germany', 'Russia'];
const DURATION = {
  hours: { min: 1, max: 3 },
  mins: { min: 0, max: 59 },
};

const generateReleaseDate = () => {
  const daysGap = getRandomNumber(-15, 15);
  const year = getRandomNumber(1900, 2000);
  return dayjs().add(daysGap, 'day').year(year).toDate();
};

const generateGenres = () => {
  return shuffleArray(GENRES).slice(0, getRandomNumber(1, 2));
};

const generateDescription = () => {
  return DESCRIPTION.split(/(?<=\.)\s*(?=[^.])/).slice(0, getRandomNumber(1, 5)).join(' ');
};

const generateDuration = () => {
  return `${getRandomNumber(DURATION.hours.min, DURATION.hours.max)}h ${getRandomNumber(DURATION.mins.min, DURATION.mins.max)}m`;
};

const generateWatchingDate = () => {
  const isWatched = Boolean(getRandomNumber(0, 1));

  if (!isWatched) {
    return null;
  }

  const maxDaysGap = 30;
  const daysGap = getRandomNumber(-maxDaysGap, 0);
  return dayjs().add(daysGap, 'day').toDate();
};

const generateFilm = () => {
  const watchingDate = generateWatchingDate();
  return {
    id: nanoid(),
    comments: getCommentIds(),
    film_info: {
      title: getRandomElement(TITLES),
      rating: getRandomNumber(RATING.min, RATING.max, 1),
      poster: getRandomElement(POSTERS),
      ageRating: getRandomElement(AGE_RATING),
      director: getRandomElement(DIRECTORS),
      writers: shuffleArray(WRITERS).slice(0, getRandomNumber(1, 3)),
      actors: shuffleArray(ACTORS).slice(0, getRandomNumber(2, 4)),
      release: {
        date: generateReleaseDate(),
        country: getRandomElement(COUNTRIES),
      },
      runtime: generateDuration(),
      genres: generateGenres(),
      description: generateDescription(),
    },
    user_details: {
      watchlist: Boolean(getRandomNumber(0, 1)),
      watched: Boolean(watchingDate),
      watchingDate: watchingDate,
      favorite: Boolean(getRandomNumber(0, 1)),
    },
  };
};

export { generateFilm };
