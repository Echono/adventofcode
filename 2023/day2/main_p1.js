const fs = require('fs');
const readline = require('readline');

const main = async function() {

    // Rules
    const rules = {
        red: 12,
        green: 13,
        blue: 14
    }

    // Read file
    const filestream = fs.createReadStream('input.txt');
    const filelines = readline.createInterface({
        input: filestream
    });

    // Result
    let accumelator = 0;

    for await (const line of filelines) {
        // Get the game number
        const gameNumber = line.split(": ").shift().split(" ").pop();
        // Get all the hands that were drawn in this game
        const handDetails = line.split(": ").pop().split("; ").map((hand) => {
            // Sort the hand by color and amount
            const picks = hand.split(", ").map((eachColor) => {
                return eachColor.split(" ");
            });
            // Package hand needly
            const result = {
                red: 0,
                green: 0,
                blue: 0
            }
            for(const colorPicked of picks) {
                result[colorPicked.pop()] = Number.parseInt(colorPicked.shift());
            }
            return result;
        });

        // Check if any of the hands picked were invalid in this game
        const result = handDetails.every((colorsPicked) => {
           return colorsPicked.red <= rules.red && colorsPicked.green <= rules.green && colorsPicked.blue <= rules.blue;
        })

        // Accumelate if valid game
        if(result) {
            accumelator += Number.parseInt(gameNumber);
        }
    }

    console.log(accumelator);

}

main();