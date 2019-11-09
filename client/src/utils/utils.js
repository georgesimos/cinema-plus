export const textTruncate = (text, length, ending) => {
  if (length == null) {
    length = 100;
  }
  if (ending == null) {
    ending = '...';
  }
  if (text.length > length) {
    return text.substring(0, length - ending.length) + ending;
  } else {
    return text;
  }
};

export const match = (term, array, key) => {
  const reg = new RegExp(term.split('').join('.*'), 'i');
  return array.filter(item => item[key] && item[key].match(reg));
};
