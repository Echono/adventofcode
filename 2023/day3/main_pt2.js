const fs = require("fs");
const readline = require("readline");

const main = async function () {

  // Read file
  const filestream = fs.createReadStream("input.txt");
  const filelines = await readline.createInterface({
    input: filestream,
  });

  // Create iterable lines
  const stringArray = [];
  for await (const line of filelines) {
    stringArray.push(line);
  }

  // Function to carve out everything around a number
  const carve = (numberObject, string, lineNumber) => {
    const startIndex = numberObject.index > 0 ? numberObject.index - 1 : numberObject.index;
    const numberEndIndex = numberObject.index + numberObject[0].length;
    const endIndex = numberEndIndex < string.length ? numberEndIndex + 1 : numberEndIndex;
    return {
      lineNumber,
      carve: string.slice(startIndex, endIndex)
    };
  }

  const gears = [];

  for(let i = 0; i < stringArray.length; i++) {

    // Regex match all numbers
    const numbers = [...stringArray[i].matchAll(/\d+/g)];
    for(const number of numbers) {

        const matrix = [];
        
        // Get the adjecent text on line before
        if(i > 0) {
            matrix.push(carve(number, stringArray[i-1], i-1));
        }

        // Get adjecent text around number
        matrix.push(carve(number, stringArray[i], i));

        // Get adjecent text on line after
        if(stringArray[i+1] !== undefined) {
            matrix.push(carve(number, stringArray[i+1], i+1));
        }
        
        // Goes through the surrounding chars of the number
        for(let x = 0; x < matrix.length; x++) {
          if(matrix[x].carve.includes('*')) { // Checks if there is a gear within a numbers vicinity
            const indexOfGear = matrix[x].carve.indexOf('*');
            const indexInString = number.index > 0 ? number.index - 1 + indexOfGear : number.index + indexOfGear; // Determines that gears index within its string
            const findGear = gears.find((gear) => { // Checks if that gear has already been found
              return gear.lineNumber == matrix[x].lineNumber && gear.index == indexInString;
            })
            if(findGear) {
              findGear.numbers.push(number[0]); // Adds the number we're working with to that gear
            } else {
              gears.push({ // Creates a new gear object to work with which tracks the data
                lineNumber: matrix[x].lineNumber,
                index: indexInString,
                numbers: [number[0]]
              });
            }
          };
        }

    }
  }

  // Calculate the summed up gear ratio
  let result = 0;
  const filteredGears = gears.filter((gear) => {
    return gear.numbers.length == 2;
  })
  for(const gear of filteredGears) {
    const gearRatio = gear.numbers.shift() * gear.numbers.pop();
    result += gearRatio
  }

  console.log(result);

};

main();
