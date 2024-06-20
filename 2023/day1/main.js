const fs = require('fs');
const readline = require('readline');

const main = async function() {

    // Create a compare array and map for corrosponding string
    const compareArray = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    const numberMap = new Map();
    for (let i = 0; i < compareArray.length; i++) {
        numberMap.set(compareArray[i], i + 1);
    }

    // Read file
    const filestream = fs.createReadStream('input.txt');
    const filelines = readline.createInterface({
        input: filestream
    });

    let result = 0;

    // Iterate File
    for await ( let line of filelines) {

        const appearences = [];

        // Convert all string numbers to actual numbers
        for(const textNumber of compareArray) {
            if(line.includes(textNumber)) { // Check if the string contains a string version of number
                // Find indicies and store
                const firstAppearence = line.indexOf(textNumber);
                const lastAppearence = line.lastIndexOf(textNumber);
                appearences.push({
                    number: numberMap.get(textNumber), 
                    firstAppearence, 
                    lastAppearence
                });
            }  
        }

        // Make string into array
        const stringArray = line.split("");

        if(appearences.length > 0) {
            // Find the very first appearence of a number string
            const lowestAppearence = appearences.reduce((lowest, current) => {
                return current.firstAppearence < lowest.firstAppearence ? current : lowest;
            }, appearences[0]);
            // Find the very last appearence of a number string
            const highestAppearence = appearences.reduce((highest, current) => {
                return current.lastAppearence > highest.lastAppearence ? current : highest;
            }, appearences[0]);

            // If there was only one string number
            if(lowestAppearence.firstAppearence === highestAppearence.lastAppearence) {
                stringArray[lowestAppearence.firstAppearence] = lowestAppearence.number.toString();
            } else {
                stringArray[lowestAppearence.firstAppearence] = lowestAppearence.number.toString();
                stringArray[highestAppearence.lastAppearence] = highestAppearence.number.toString();
            }

        }

        // filter numbers
        const numbersInLine = stringArray.filter((char) => {
            return char >= '0' && char <= '9';
        })

        // Check if there's only one number in array as this is going to dub else continue
        const numberAsString = numbersInLine.length <= 1 ? numbersInLine[0] + numbersInLine[0] : numbersInLine.shift() + numbersInLine.pop();
        result += Number.parseInt(numberAsString);

    }

    console.log(result);
}

main();