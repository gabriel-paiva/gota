export default function transformDate(stringToTransform) {
  let arrayOfStrings = stringToTransform.split("T");
  let date = arrayOfStrings[0].split("-");
  date = date.reverse()
  let string = date[0] + "/" + date[1] + "/" + date[2];
  return (string)
}