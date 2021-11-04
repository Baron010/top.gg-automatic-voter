require('dotenv').config();
const puppeteer = require('puppeteer');
const { BOT_ID, BOT_NAME, COOKIE } = process.env;
const logger = require('./logger.js');

if (!BOT_ID) return logger.err('Config BOT_ID is missing');
if (!BOT_NAME) return logger.err('Config BOT_NAME is missing');
if (!COOKIE) return logger.err('Config COOKIE is missing');

async function vote() {
	logger.try(`Trying to vote for ${BOT_NAME}...`);

	const browser = await puppeteer.launch({ headless: false, args: ['--window-size=0,300'] });
	const page = (await browser.pages())[0];

	await page.setCookie({ name: 'connect.sid', value: COOKIE, domain: 'top.gg', path: '/' });
	await page.goto(`https://top.gg/bot/${BOT_ID}/vote`);

	await new Promise((resolve)=>setTimeout(() => {
		page.click('#votingvoted');
        resolve();
	}, 10000));

	await new Promise((resolve)=>setTimeout(() => {
		logger.succ(`Successfully voted for ${BOT_NAME}!`);
		browser.close()
		logger.info('Waiting 12 hours');
        resolve();
	}, 2000));
}
vote();

setInterval(() => {
	vote();
}, 1000 * 60 * 60 * 12);
