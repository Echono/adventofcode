const fs = require('fs');
const readline = require('readline');

const main = async function() {

    // Read file
    const filestream = fs.createReadStream('input.txt');
    const filelines = readline.createInterface({
        input: filestream
    });
    
    let totalWinnings = 0;

    const cardDetails = [];

    for await (const line of filelines) {

        // Whitespace regex
        const whitespaceRegex = /^\D+/g;

        // Find the card number
        const lineSplit = line.split(": ");
        const gameNumber = lineSplit.shift().replace(whitespaceRegex, '');
        
        // Find the card details. Winning numbers and play numbers
        const cardSplit = lineSplit.pop().split(" | ");
        cardDetails.push({
            winningNumbers: cardSplit.shift().split(" ").filter((entry) => {
                return entry !== '';
            }).sort((a, b) => {return a - b}),
            cardNumbers: cardSplit.pop().split(" ").filter((entry) => {
                return entry !== '';
            }).sort((a, b) => {return a - b}),
            copies: 1
        });

    };

    // Calulate all the winnings for this card
    for(let i = 0; i < cardDetails.length; i++) {

        // Numbers that has won
        let winningNumberOccourances = 0;
        for(const winningNumber of cardDetails[i].winningNumbers) {
            for(const playNumber of cardDetails[i].cardNumbers) {
                if(winningNumber === playNumber) {
                    winningNumberOccourances++;
                }
            }
        }

        // Calculate additional copies based on the current cards winnings
        for(let x = 0; x < winningNumberOccourances; x++) {
            cardDetails[i+1+x].copies += 1 * cardDetails[i].copies;
        }
    }

    // Calculate total copies
    let totalCopies = 0;
    for(const detail of cardDetails) {
        totalCopies += detail.copies;
    }

    console.log(totalCopies);

}

main();