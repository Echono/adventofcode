const fs = require('fs');
const readline = require('readline');

const main = async function() {

    // Read file
    const filestream = fs.createReadStream('input.txt');
    const filelines = readline.createInterface({
        input: filestream
    });
    
    let firstList = [];
    let secondList = [];

    for await (const line of filelines) {
        const split = line.split(',');
        firstList.push(split.shift());
        secondList.push(split.pop());
    }

    firstList = firstList.sort((a, b) => a -b );
    secondList = secondList.sort((a, b) => a -b );

    let total = 0;
    for(let i = 0; i < firstList.length; i++) {
        const distance = Math.abs(parseInt(firstList[i]) - parseInt(secondList[i]));
        total += distance;
    }

    console.log(total);

}

main();