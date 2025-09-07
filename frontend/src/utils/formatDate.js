import dayjs from 'dayjs';

const DEFAULT_FORMAT = 'DD MMM, YYYY';

export const formatDate = (input, format = DEFAULT_FORMAT) => {
  if (!input) return '';
  const d = dayjs(input);
  if (!d.isValid()) return '';
  return d.format(format);
};

export default formatDate;


