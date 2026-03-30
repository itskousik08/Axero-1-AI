const fs = require('fs');
const path = require('path');
const readline = require('readline');

const modelPath = path.join(__dirname, '../model/model.json');
if (!fs.existsSync(modelPath)) {
    console.log("Model not found! Run 'npm run train' first.");
    process.exit();
}

const model = JSON.parse(fs.readFileSync(modelPath, 'utf-8'));

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Axero-1-AI is ready! Type your message:");

function getReply(input) {
    input = input.toLowerCase();

    // Exact match / keyword match
    for (let pair of model) {
        if (input.includes(pair.input)) {
            return pair.output;
        }
    }

    // Random fallback
    const randomIndex = Math.floor(Math.random() * model.length);
    return "Hmm... maybe: " + model[randomIndex].output;
}

rl.on('line', (input) => {
    console.log("Axero-1-AI:", getReply(input));
});
