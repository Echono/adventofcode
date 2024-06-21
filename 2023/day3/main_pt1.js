const fs = require("fs");
const readline = require("readline");

const main = async function () {
  // Symbols to track
  const symbols = ["*", "#", "/", "@", "=", "$", "%", "-", "+", "&"];

  // Read file
  const filestream = fs.createReadStream("input.txt");
  const filelines = await readline.createInterface({
    input: filestream,
  });

  // Create iterable lines
  const stringArry = [];
  for await (const line of filelines) {
    stringArry.push(line);
  }

  // Function to carve out everything around a number
  const carve = (numberObject, string) => {
    const startIndex = numberObject.index > 0 ? numberObject.index - 1 : numberObject.index;
    const numberEndIndex = numberObject.index + numberObject[0].length;
    const endIndex = numberEndIndex < string.length ? numberEndIndex + 1 : numberEndIndex;
    return string.slice(startIndex, endIndex);
  }

  let result = 0;

  for(let i = 0; i < stringArry.length; i++) {

    // Regex match all numbers
    const numbers = [...stringArry[i].matchAll(/\d+/g)];
    for(const number of numbers) {

        const matrix = [];

        // Get the adjecent text on line before
        if(i > 0) {
            matrix.push(carve(number, stringArry[i-1]));
        }

        // Get adjecent text around number
        matrix.push(carve(number, stringArry[i]));

        // Get adjecent text on line after
        if(stringArry[i+1] !== undefined) {
            matrix.push(carve(number, stringArry[i+1]));
        }

        // Make matrix into one string
        const oneString = matrix.reduce((acc, current) => {
            return acc + current;
        }, "")

        // Check string if it includes a symbol
        let includesSymbol = false;
        for(let i = 0; i < symbols.length && !includesSymbol; i++) {
            if(oneString.includes(symbols[i])) {
                includesSymbol = true;
            }
        }

        // Adds if there's a symbol
        if(includesSymbol) {
            result += Number.parseInt(number[0]);
        }
        
    }
  }

  console.log(result);
};

main();
