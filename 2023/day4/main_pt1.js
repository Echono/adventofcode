const fs = require('fs');
const readline = require('readline');

const main = async function() {

    // Read file
    const filestream = fs.createReadStream('input.txt');
    const filelines = readline.createInterface({
        input: filestream
    });
    
    let totalWinnings = 0;

    for await (const line of filelines) {

        // Whitespace regex
        const whitespaceRegex = /^\D+/g;

        // Find the card number
        const lineSplit = line.split(": ");
        const gameNumber = lineSplit.shift().replace(whitespaceRegex, '');
        
        // Find the card details. Winning numbers and play numbers
        const cardSplit = lineSplit.pop().split(" | ");
        const cardDetails = {
            winningNumbers: cardSplit.shift().split(" ").filter((entry) => {
                return entry !== '';
            }).sort((a, b) => {return a - b}),
            cardNumbers: cardSplit.pop().split(" ").filter((entry) => {
                return entry !== '';
            }).sort((a, b) => {return a - b})
        }

        // Calculate card value
        let cardValue = 0;
        for(const winningNumber of cardDetails.winningNumbers) {
            for(const playNumber of cardDetails.cardNumbers) {
                if(winningNumber === playNumber) {
                    cardValue === 0 ? cardValue = 1 : cardValue *= 2;
                }
            }
        }

        totalWinnings += cardValue;

    }

    console.log(totalWinnings);

}

main();