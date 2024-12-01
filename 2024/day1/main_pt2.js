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
    let pointer = 0;
    for(const orgNumber of firstList) {
        let counter = 0;
        for(pointer; pointer < secondList.length; pointer++) {
            if(parseInt(secondList[pointer]) > parseInt(orgNumber)) {
                break;
            }
            if(orgNumber === secondList[pointer]) {
                counter++;
            }
        }
        total += orgNumber * counter;
    }

    console.log(total);

}

main();