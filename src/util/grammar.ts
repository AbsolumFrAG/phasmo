export function getIndefiniteArticle(word: string) {
  const firstChar = word[0].toLowerCase();
  const match = ["a", "e", "i", "o", "u"].some((vowel) => firstChar === vowel);
  return match ? "un" : "un";
}
