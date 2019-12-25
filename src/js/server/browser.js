const puppeteer = require("puppeteer");

// TODO: improve performance, only one browser instance?
module.exports = async (url, width, height) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  console.log("%c Log: %c width ", ...Array(2).fill("color:aqua"), width);
  page.setViewport({ width, height });

  // TODO: cannot send http as a url param at the moment, might have to rework everything to post?
  if (!url.includes("http")) url = `http://` + url;

  await page.goto(url);

  const title = await page.title();
  const image = await page.screenshot({ encoding: "base64", fullPage: true });

  await browser.close();

  return {
    title,
    image: `data:image/png;base64, ${image}`
  };
};
