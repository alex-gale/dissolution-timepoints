// function to generate an array of numbers from 0 to n
const generateNumberArray = (n, offset = 0) => [...Array(n).keys()].map((i) => i + offset)

export {
  generateNumberArray
}
