const removeSpecialCharacter = (str) =>
  str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    ""
  );

export const generateNameId = ({ name, id }) => {
  return removeSpecialCharacter(name).replace(/\s/g, "-") + `-i-${id}`;
};
