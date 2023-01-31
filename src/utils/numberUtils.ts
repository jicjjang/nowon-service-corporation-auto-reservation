export const numberToHourMinutes = (number: number) => {
  return `${number > 9 ? number : `0${number}`}:00`;
};

export const numberZeroPrefixUpTo10 = (number: number) => {
  return `${number > 9 ? number : `0${number}`}`;
};
