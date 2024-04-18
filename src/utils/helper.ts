import moment from 'moment';

export const getDate = (value: string) => {
  const date = moment(value);

  const dayOfWeek = date.format('dddd');

  const dayOfMonth = date.format('Do');

  const year = date.format('YYYY');

  const hour = date.format('HH');
  const minutes = date.format('mm');
  const seconds = date.format('ss');
  const amPm = date.format('a');

  const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${year}, ${hour}:${minutes}:${seconds}`;

  return formattedDate;
};

export const getDateAndTime = (value: Date, offset: number) => {
  const offsetInSeconds = offset; // 5 minutes

  const newDateTime = moment(value).add(offsetInSeconds, 'seconds');

  const dayOfWeek = newDateTime.format('dddd');
  const dayOfMonth = newDateTime.format('Do');
  const year = newDateTime.format('YYYY');
  const hour = newDateTime.format('HH');
  const minutes = newDateTime.format('mm');
  const seconds = newDateTime.format('ss');
  const amPm = newDateTime.format('a');

  const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${year}, ${hour}:${minutes}:${seconds} ${amPm.toUpperCase()}`;

  return formattedDate;
};
