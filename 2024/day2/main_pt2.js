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
        this.orgLevelLength = levels.length;
        let condition = determineCondition(levels.length);
        const direction = determineDirection(levels[0], levels[1]);
        if(direction === 'eq') condition = determineCondition(levels.length);
        for(this.i = 0; this.i < levels.length - 1 && condition; this.i++) {
            const firstNumber = levels[this.i];
            const secondNumber = levels[this.i + 1];
            const difference = Math.abs(firstNumber - secondNumber);
            if(determineDirection(firstNumber, secondNumber) !== direction || difference > 3 || difference < 1) {
                condition = determineCondition(levels.length);
            }
        }
        if(condition) result++;
    }

    console.log(result);

}

const determineCondition = (levelLength) => {
    if(this.orgLevelLength !== levelLength) {
        return false;
    } else {
        return true; 
    }
}

const determineDirection = (first, second) => {
    return first < second ? 'asc' : first === second ? 'eq' : 'desc';
}

main();