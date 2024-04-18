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
  const offsetInSeconds = offset;

  // const newDateTime = moment(value).add(offsetInSeconds, 'seconds');

  const newDateTime = moment(value);

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

export const getTimeInMiliseconds = (value: Date, offset: number): number => {
  // Given date string
  const _date = new Date(value);

  console.log('Date is ', _date);
  // Offset in seconds
  const offsetSeconds = offset;
  // Convert offset from seconds to milliseconds
  const offsetMilliseconds = offsetSeconds * 60 * 1000;

  // Add the offset to the date
  const newDate = new Date(_date.getTime() + offsetMilliseconds);
  console.log('new date is ', newDate);
  // Get the time of the new date in milliseconds
  const newDateMilliseconds = newDate.getTime();

  return newDateMilliseconds;
};
