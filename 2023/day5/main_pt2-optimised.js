const fs = require('fs');
const readline = require('readline');
const { start } = require('repl');

const main = async function() {

    const almanac = await structureData("input.txt");
    const results = [];
    for(const seed of almanac.seeds) {
        const seedRange = {
            low: seed.number,
            high: seed.number + seed.amount
        }
        const result = calculateLowestInRange(seedRange, almanac, 0);
        results.push(result);
    }

    debugger;

}

const calculateLowestInRange = (range, almanac, map) => {

    

    debugger;
}

const structureData = async (filename) => {

    // Read file
    const filestream = fs.createReadStream(filename);
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
            const seeds = line.split("seeds: ").pop().split(" ").map((seed) => {return Number.parseInt(seed)});
            const newSeeds = [];
            let newSeed;
            for(let i = 0; i < seeds.length; i++) {
                if(i % 2 === 0) {
                    newSeed = {
                        number: seeds[i],
                        locations: []
                    };
                } else {
                    newSeed.amount = seeds[i];
                    newSeeds.push(newSeed);
                }
            }
            almanac.seeds = newSeeds;
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
            low: step[1],
            high: step[1] + step[2],
            difference: step[0] - step[1]
        };
        almanac.maps[mapIndex].push(stepObject);

    }

    return almanac;

}

main();