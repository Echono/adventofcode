const fs = require('fs');
const readline = require('readline');

const main = async function() {

    // Read file
    const filestream = fs.createReadStream('input.txt');
    const filelines = readline.createInterface({
        input: filestream
    });

    const reports = [];

    for await (const line of filelines) {
        reports.push(line.split(' ').map(Number));
    };

    let result = 0;
    for(const levels of reports) {
        let condition = true;
        const direction = determineDirection(levels[0], levels[1]);
        if(direction === 'eq') condition = false;
        for(let i = 0; i < levels.length - 1 && condition; i++) {
            const firstNumber = levels[i];
            const secondNumber = levels[i + 1];
            const difference = Math.abs(firstNumber - secondNumber);
            if(determineDirection(firstNumber, secondNumber) !== direction || difference > 3 || difference < 1) {
                condition = false;
            }
        }
        if(condition) result++;
    }

    console.log(result);

    debugger;

}

const determineDirection = (first, second) => {
    return first < second ? 'asc' : first === second ? 'eq' : 'desc';
}

main();