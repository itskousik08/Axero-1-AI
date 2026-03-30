const fs = require("fs");
const readline = require("readline");
const chalk = require("chalk");
const { processMessage } = require("./src/engine");
const config = require("./data/config.json");

const model = JSON.parse(fs.readFileSync("./model/model.json"));
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

console.log(chalk.bold.blue(`\n--- ${config.name} v3.0 (Web-Powered) ---`));
console.log(chalk.magenta(`Welcome, Master ${config.owner}! How can I assist you today? 🌟\n`));

const chat = () => {
    rl.question(chalk.yellow("You: "), async (msg) => {
        if (msg.toLowerCase() === "exit") return rl.close();
        
        const reply = await processMessage(msg, model);
        
        process.stdout.write(chalk.cyan(`${config.name}: `));
        let i = 0;
        const interval = setInterval(() => {
            process.stdout.write(reply[i]);
            i++;
            if (i >= reply.length) {
                clearInterval(interval);
                console.log("\n");
                chat();
            }
        }, 25);
    });
};

chat();
