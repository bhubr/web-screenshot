const puppeteer = require('puppeteer');
const slugify = require('slugify');
const mkdirp = require('mkdirp');
const fs = require('fs');
const { promisify } = require('util');
const accessAsync = promisify(fs.access);
const mkdirAsync = promisify(mkdirp);

async function checkWritable(folder) {
  await accessAsync(folder, fs.constants.W_OK);
}

async function mkdirIfNotExists (folder){
  await checkWritable(folder)
    .catch(err => mkdirAsync(folder))
    .catch(err => {
      console.error(err);
      throw err;
    });
}

async function getPic(url, destFolder) {
  await mkdirIfNotExists(destFolder);

  // OK, launch browser
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