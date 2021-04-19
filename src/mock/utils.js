import dayjs from 'dayjs';

const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

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

const humanizeDate = (date, template = 'D MMMM YYYY') => {
  return dayjs(date).format(template);
};

const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export {
  getRandomNumber,
  getRandomElement,
  shuffleArray,
  humanizeDate,
  render,
  createElement,
  RenderPosition
};
