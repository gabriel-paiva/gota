export default function trataString(string) {
  let novaString = string.replace(/\s/g, '');

  novaString = novaString.normalize('NFD').replace(/[^a-zA-Zs ]/g, '').toLowerCase();

  return novaString;
}