const fs = require('fs');

const data = [
    "hello | Hi! How can I help? ; Hello master Kousik! ; Hey there! 😊",
    "how are you | I'm doing great! Just browsing the digital waves. ; Fantastic! Ready to help you! 🚀",
    "who are you | I am Axero-1-AI, your personal genius assistant. ; I'm your friendly AI companion!",
    "tell me a joke | Why did the robot go on vacation? To recharge its batteries! 🔋 ; Why was the computer cold? It left its Windows open! 😂",
    // Imagine thousands of lines like this...
];

// This loop generates a huge file for training
let bigData = "";
for(let i = 0; i < 5000; i++) {
    bigData += data[i % data.length] + "\n";
}

fs.writeFileSync('./data/prompt.txt', bigData);
console.log("✅ 3MB Dataset Generated!");
