export function hasEmptyFields(fields) {
  const keys = Object.keys(fields);
  return keys.every(key => !fields[key]);
}