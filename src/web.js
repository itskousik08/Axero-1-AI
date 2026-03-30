const puppeteer = require('puppeteer-core');
const config = require('../data/config.json');

async function searchWeb(query) {
    try {
        const browser = await puppeteer.launch({
            executablePath: config.chromePath,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        await page.goto(`https://www.google.com/search?q=${encodeURIComponent(query)}`);
        
        // Extract the first descriptive snippet from Google
        const result = await page.evaluate(() => {
            let snippet = document.querySelector('.VwiC3b')?.innerText;
            return snippet ? snippet : "I found something, but it's hard to explain! Check the web! 🌐";
        });

        await browser.close();
        return result;
    } catch (error) {
        return "I tried to look it up on the web, but I hit a small snag! 😅";
    }
}

module.exports = { searchWeb };
