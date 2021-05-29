const getRandomNumber = (min, max, afterComma = 0) => {
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

export {
  getRandomNumber,
  getRandomElement,
  shuffleArray
};
