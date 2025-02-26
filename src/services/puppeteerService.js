const puppeteer = require('puppeteer');

const Html2Pdf = async (html, paperSize) => {
  // setting chromium path, needed only on Docker
  const chromiumPath =
  process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === "test" ||
    process.env.NODE_ENV === undefined ?
  '' :
  '/usr/bin/chromium'

  // launch a new chrome instance
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: chromiumPath
  });

  // create a new page
  const page = await browser.newPage();

  // set your html as the pages content
  await page.setContent(html, {
    waitUntil: 'domcontentloaded'
  });

  // create a pdf buffer
  const pdfBuffer = await page.pdf({
    format: paperSize
  });

  await browser.close();

  return pdfBuffer;
}

module.exports = {Html2Pdf};