export const formatDate = (date) => {
  const month = new Date(date).toLocaleString('default', { month: 'long' });
  const day = new Date(date).getDate();
  const year = new Date(date).getFullYear();
  return `${month} ${day}, ${year}`;
};

export const toUpperCaseFirstChar = (string) => {
  return `${string[0].toUpperCase()}${string.slice(1, string.length)}`;
};
