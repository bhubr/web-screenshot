const puppeteer = require('puppeteer');
const slugify = require('slugify');

async function getPic(url, destFolder) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const slug = slugify(url.replace(/https?\:\/\//, ''));
  const path = `${destFolder}/${slug}-${Date.now()}.png`;
  await page.setViewport({ width: 1200, height: 800 });
  await page.goto(url);
  await page.screenshot({ path });

  await browser.close();
  return path;
}

module.exports = getPic;