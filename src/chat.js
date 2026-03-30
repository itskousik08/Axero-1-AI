const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { fetchFromWeb } = require('./puppeteerFetch');

// Load trained model
const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../model/model.json')));

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function getReply(input) {
    input = input.toLowerCase();
    let best = "Hmm… maybe I don’t know exactly, but let’s chat anyway! 😄";
    let maxScore = 0;

    for(const pair of data) {
        const score = pair.input.toLowerCase().split(" ").filter(w => input.includes(w)).length;
        if(score > maxScore){
            maxScore = score;
            best = pair.output;
        }
    }

    // If no match, fetch info online
    if(maxScore === 0){
        best = await fetchFromWeb(input);
    }

    return best;
}

console.log("Axero-1-AI is ready! Type your message:");

rl.on('line', async (input) => {
    const reply = await getReply(input);
    console.log(`Axero-1-AI: ${reply}`);
});
