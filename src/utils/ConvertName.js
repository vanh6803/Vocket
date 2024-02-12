export const shortenName = name => {
  if (name) {
    const words = name.split(' ');
    const initials = words.map(word => (word.length > 1 ? word[0] : ''));
    const result = initials.join('').toUpperCase();
    return result;
  } else {
    return '';
  }
};
