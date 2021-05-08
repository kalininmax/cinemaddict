import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { getRandomNumber, getRandomElement, shuffleArray } from '../utils/common';


const USER_NAMES = ['Mark Matthews', 'Paul Skinner', 'John Webster', 'Leonard Bailey', 'Terence Bridges', 'Donald Oliver', 'James Hardy'];
const COMMENTS = ['Boring movie', 'One time okay movie', 'Superb and extremely deeply intimidating moviesTeaches us all about the life', 'Awesome movie', 'I never watched movie like this this is a epic one must watch', 'Well writted and directed! deserved all the nominations and winnings. A must watch for all', 'This a greatest movie ever I have seen'];
const EMOTIONS = ['smile', 'sleeping', 'puke', 'angry'];
const COMMENTS_COUNTER = 30;

const generateDate = () => {
  const maxDaysGap = 20;
  const daysGap = getRandomNumber(-maxDaysGap, 0);
  return dayjs().add(daysGap, 'day').toDate();
};

const generateComment = () => {
  return {
    id: nanoid(),
    author: getRandomElement(USER_NAMES),
    comment: getRandomElement(COMMENTS),
    date: generateDate(),
    emotion: getRandomElement(EMOTIONS),
  };
};

const generateComments = () => {
  const comments = [];
  for (let i = 0; i < COMMENTS_COUNTER; i++) {
    comments.push(generateComment());
  }
  return comments;
};

const allComments = generateComments();

const getCommentIds = () => {
  return shuffleArray(allComments).slice(0, getRandomNumber(1, 5)).map(({ id }) => id);
};

export { getCommentIds, allComments, EMOTIONS };
