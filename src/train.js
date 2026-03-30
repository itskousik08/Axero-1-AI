const fs = require("fs");
const path = require("path");

// Load prompt dataset
const data = fs.readFileSync(path.join(__dirname, "../data/prompt.txt"), "utf-8")
  .split("\n")
  .filter(line => line.trim() !== "")
  .map(line => {
      const parts = line.split(".");
      return { input: parts[0].trim(), output: parts.slice(1).join(".").trim() };
  });

// Ensure model folder exists
const modelDir = path.join(__dirname, "../model");
if(!fs.existsSync(modelDir)) fs.mkdirSync(modelDir);

// Save trained model
fs.writeFileSync(path.join(modelDir, "model.json"), JSON.stringify(data, null, 2));
console.log("Model trained! Ready to chat.");
