export const locale = undefined; // browser default

/**
 * Date format for displaying dates.
 */
export const dateFormat: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

/**
 * Time format for displaying times.
 */
export const timeFormat: Intl.DateTimeFormatOptions = {
  hourCycle: 'h23',
  hour: '2-digit',
  minute: '2-digit',
};
