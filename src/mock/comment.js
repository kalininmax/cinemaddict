import dayjs from 'dayjs';
import { getRandomNumber, getRandomElement, shuffleArray } from './utils';


const USER_NAMES = ['Mark Matthews', 'Paul Skinner', 'John Webster', 'Leonard Bailey', 'Terence Bridges', 'Donald Oliver', 'James Hardy'];
const COMMENTS = ['Boring movie', 'One time okay movie', 'Superb and extremely deeply intimidating moviesTeaches us all about the life', 'Awesome movie', 'I never watched movie like this this is a epic one must watch', 'Well writted and directed! deserved all the nominations and winnings. A must watch for all', 'This a greatest movie ever I have seen'];
const EMOTION = ['smile', 'sleeping', 'puke', 'angry'];
const COMMENTS_COUNTER = 30;

const generateDate = () => {
  const maxDaysGap = 20;
  const daysGap = getRandomNumber(-maxDaysGap, maxDaysGap);
  return dayjs().add(daysGap, 'day').toDate();
};

const generateComment = (id) => {
  return {
    id: id,
    author: getRandomElement(USER_NAMES),
    comment: getRandomElement(COMMENTS),
    date: generateDate(),
    emotion: getRandomElement(EMOTION),
  };
};

const generateComments = () => {
  const comments = [];
  for (let i = 0; i < COMMENTS_COUNTER; i++) {
    comments.push(generateComment(i));
  }
  return comments;
};

const comments = generateComments();

const getCommentIds = () => {
  return shuffleArray(comments).slice(0, getRandomNumber(1, 7)).map(({ id }) => id);
};

export { getCommentIds };
