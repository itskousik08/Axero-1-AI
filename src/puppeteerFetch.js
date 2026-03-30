const puppeteer = require('puppeteer');

async function fetchFromWeb(query) {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        
        // Google search
        await page.goto(`https://www.google.com/search?q=${encodeURIComponent(query)}`);
        
        // Wait for search results
        await page.waitForSelector('h3');
        const results = await page.evaluate(() => {
            const items = Array.from(document.querySelectorAll('h3'));
            return items.slice(0,3).map(x => x.innerText);
        });

        await browser.close();
        return results.join(". ") || "Sorry, I couldn't find results online.";
    } catch (err) {
        return "Error fetching info: " + err.message;
    }
}

module.exports = { fetchFromWeb };
