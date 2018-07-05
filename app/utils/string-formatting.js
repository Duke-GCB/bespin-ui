export function labelFromName(fieldName) {
  /**
   * replaces underscores with spaces and capitalizes each word
   */
  return fieldName
    .replace(/_/g, ' ') // underscores to spaces
    .split(/ +/) // split on spaces
    .map(x => x.capitalize()) // capitalize all words
    .join(' '); // put string together
}


