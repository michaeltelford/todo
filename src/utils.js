const appendBreakClass = (classes, str) => {
  const singleWord = (str.split(' ').length === 1);

  if (singleWord && str.length > 25) {
    return classes + ' break-all';
  }

  return classes;
}

export {
  appendBreakClass,
}
