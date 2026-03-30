const fs = require("fs");
const path = require("path");

console.log("🧠 Training Axero-1-AI... Please wait.");

const rawData = fs.readFileSync(path.join(__dirname, "../data/prompt.txt"), "utf-8").split("\n");
const trained = rawData.filter(l => l.includes("|")).map(line => {
    const [q, a] = line.split("|");
    return { input: q.trim().toLowerCase(), output: a.trim().split(";") };
});

fs.writeFileSync(path.join(__dirname, "../model/model.json"), JSON.stringify(trained, null, 2));
console.log("✅ Brain Updated! Ready to go.");
