import chromium from 'chrome-aws-lambda';
import * as fs from 'fs';
import path from 'path';

exports.handler = async (event, context) => {

  const parsedBody = JSON.parse(event.body);
  const { url, viewport } = parsedBody;

  if (!url) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Page URL not defined' })
    }
  }

  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
  });

  const page = await browser.newPage();

  await page.setViewport(viewport);

  let screenshot = null;

  const response = await page.goto(url, { waitUntil: 'networkidle2' });

  if (response.status() < 400) {
    // const screenshot = await page.screenshot({ encoding: 'binary' });
    screenshot = await page.screenshot({
      type: 'jpeg',
      quality: 100,
      encoding: 'base64',
    });
  }

  await browser.close();

  if (!screenshot) {
    const path = path.join(process.cwd(), 'og-corona.png');
    const pngBuffer = fs.readFileSync(path);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'image/png' },
      body: pngBuffer.toString('base64'),
      isBase64Encoded: true,
    }
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'image/jpeg' },
    body: screenshot,
    isBase64Encoded: true,
  }

}
