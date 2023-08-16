import { fork } from 'child_process';
import puppetteer from 'puppeteer';

jest.setTimeout(30000); // default puppeteer timeout

describe('Credit Card Validator form', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:8888';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      // headless: false, // show gui
      // slowMo: 100,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('input valid card number', async () => {
    await page.goto(baseUrl);
    const input = await page.$('.form-container__input');
    await input.type('2200111011311510');
    const button = await page.$('.form-container__button');
    await button.click();
    await page.waitForSelector('.valid');
  });

  test('input invalid card number', async () => {
    await page.goto(baseUrl);
    const input = await page.$('.form-container__input');
    await input.type('2200111011311550');
    const button = await page.$('.form-container__button');
    await button.click();
    await page.waitForSelector('.not-valid');
  });
});
