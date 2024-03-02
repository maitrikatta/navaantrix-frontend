export function isAlphabets(str) {
  if (str.match(/[^a-zA-Z\s]+/gi)) return false;
  else return true;
}
export function getNumber(str) {
  const numbers = str.match(/[0-9]+/g);
  if (Array.isArray(numbers) && numbers.length) {
    return numbers.join("");
  } else {
    return false;
  }
}
