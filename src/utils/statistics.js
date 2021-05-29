import dayjs from 'dayjs';
import { StatsDate } from '../const';

const getStatsTime = (timeInterval) => {
  let dateFrom = dayjs(), dateTo;

  switch (timeInterval) {
    case StatsDate.ALL_TIME.type:
      dateFrom = null;
      dateTo = null;
      break;

    case StatsDate.TODAY.type:
      dateTo = dayjs().subtract(1, 'day');
      break;

    case StatsDate.WEEK.type:
      dateTo = dayjs().subtract(7, 'day');
      break;

    case StatsDate.MONTH.type:
      dateTo = dayjs().subtract(30, 'day');
      break;

    case StatsDate.YEAR.type:
      dateTo = dayjs().subtract(365, 'day');
      break;

    default:
      break;
  }

  return [dateFrom, dateTo];
};

export { getStatsTime };
