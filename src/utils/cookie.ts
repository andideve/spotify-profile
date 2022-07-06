export const createExpires = (seconds: number) => {
  const date = new Date();
  date.setTime(date.getTime() + seconds * 1000);

  return date.toUTCString();
};
