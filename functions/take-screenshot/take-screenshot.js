const chromium = require('chrome-aws-lambda');
const fs = require('fs');
const path = require('path');

const { BASE_URL } = process.env;

const dataMap = {
  globalStatsToday: {
    url: `${BASE_URL}/share/global-stats-today`,
    viewport: { width: 1337, height: 700 },
  },
  countryStatsToday: {
    url: `${BASE_URL}/share/country-stats-today/{countryCode}`,
    viewport: { width: 720, height: 375 },
  },
};

exports.handler = async (event, context) => {

  const { type = "globalStatsToday", countryCode } = event.queryStringParameters;

  if (!["globalStatsToday", "countryStatsToday"].includes(type)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid type: ' + type }),
    };
  }

  const isCountryStats = type === "countryStatsToday";
  if (isCountryStats && !countryCode) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'countryCode is required.' }),
    };
  }

  let { viewport, url } = dataMap[type];

  if (isCountryStats) {
    url = url.replace("{countryCode}", countryCode);
  }

  console.log("type:", type);
  console.log("url:", url);
  console.log("viewport:", viewport);

  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
  });

  const page = await browser.newPage();

  await page.setViewport(viewport);

  let screenshot = null;

  const response = await page.goto(url, { waitUntil: 'networkidle0' });

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
