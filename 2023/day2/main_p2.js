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

        // Determine the highest color count of all hands in game
        const highestColorCounts = handDetails.reduce((acc, current) => {
            return {
                red: Math.max(acc.red, current.red),
                green: Math.max(acc.green, current.green),
                blue: Math.max(acc.blue, current.blue)
            }
        }, {red: 0, green: 0, blue: 0});

        // Calculate power
        const power = highestColorCounts.red * highestColorCounts.green * highestColorCounts.blue;

        accumelator += power;

    }

    console.log(accumelator);

}

main();