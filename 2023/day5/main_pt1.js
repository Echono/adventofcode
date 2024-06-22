const fs = require('fs');
const readline = require('readline');

const main = async function() {

    // Read file
    const filestream = fs.createReadStream('input.txt');
    const filelines = readline.createInterface({
        input: filestream
    });
    
    // Structured data
    const almanac = {
        maps: []
    };

    let mapIndex;
    for await (const line of filelines) {

        // If the line is empty
        if(line === "") {
            continue;
        }

        // Create a new map
        if(mapIndex !== undefined) {
            if(almanac.maps[mapIndex] === undefined) {
                almanac.maps[mapIndex] = [];
            }
        }

        // Gather seeds
        if(line.includes("seeds: ")) {
            const seeds = line.split("seeds: ").pop().split(" ").map((seed) => {
                return {
                    number: Number.parseInt(seed),
                    location: null
                }
            });
            almanac.seeds = seeds;
            continue;
        }

        // Increment mapIndex if a new map appears
        if(line.includes("map:")) {
            if(mapIndex !== undefined) {
                almanac.maps[mapIndex].sort((a, b) => {
                    return a.sourceRangeStart - b.sourceRangeStart; // Sort by source range start as asc
                })
                mapIndex++; // Next map
            } else {
                mapIndex = 0; // Start map count
            }
            continue;
        }

        // Add data to the current map
        const step = line.split(" ").map((number) => {
            return Number.parseInt(number);
        });
        const stepObject = {
            sourceRangeStart: step[1],
            destinationRangeStart: step[0],
            rangeLength: step[2]
        };
        almanac.maps[mapIndex].push(stepObject);

    }

    for(const seed of almanac.seeds) { // Every seed
        let transformation = seed.number;
        for(const map of almanac.maps) { // Every map
            for(const step of map) {
                if(step.sourceRangeStart < transformation && step.sourceRangeStart + step.rangeLength > transformation) {
                    // Found step send for handling
                    transformation = sourceToDestination(transformation, step);
                    break;
                }
            }
        }
        seed.location = transformation;
    }

    const lowestSeedLocation = almanac.seeds.reduce((lowest, current) => {
        return current.location < lowest.location ? current : lowest;
    }, almanac.seeds[0])

    console.log(lowestSeedLocation.location);

}

const sourceToDestination = (input, step) => {
    // Navigates through the step and returns the transformed value
    const difference = input - step.sourceRangeStart;
    return step.destinationRangeStart + difference;
}

main();