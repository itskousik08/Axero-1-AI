const fs = require('fs');
const path = require('path');

function loadTrainingData() {
    const dataPath = path.join(__dirname, '../data/sample.txt');
    const lines = fs.readFileSync(dataPath, 'utf-8').split('\n').filter(l => l.trim() !== '');
    const training = [];
    lines.forEach(line => {
        const [input, output] = line.split('?').map(s => s.trim());
        training.push({input: input.toLowerCase(), output: output || "Sorry, I don't know that yet."});
    });
    return training;
}

function saveModel(model) {
    const modelPath = path.join(__dirname, '../model/model.json');
    fs.writeFileSync(modelPath, JSON.stringify(model, null, 2));
    console.log("Model trained and saved at model/model.json");
}

const model = loadTrainingData();
saveModel(model);
