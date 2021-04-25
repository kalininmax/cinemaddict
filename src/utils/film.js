import dayjs from 'dayjs';

const humanizeDate = (date, template = 'D MMMM YYYY') => {
  return dayjs(date).format(template);
};

export { humanizeDate };
