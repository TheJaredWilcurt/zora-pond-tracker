export const titleCase = function (string) {
  return string
    .split('-')
    .map((word) => {
      if (word === 'of') {
        return word;
      }
      return (
        word[0].toUpperCase() +
        word.substring(1)
      );
    })
    .join(' ');
};
