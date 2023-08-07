// import { test, expect } from '../fixture';
import * as path from "path"
import * as fs from 'fs';
import { expect, test } from "@playwright/test";

test('manually created context', async ({ browser }, testInfo) => {
  const videoDir = path.join(testInfo.outputPath(), 'videos');
  const context = await browser.newContext({ recordVideo: { dir: videoDir } });
  const page = await context.newPage();
  const page2 = await context.newPage();
  try {
    await page2.goto('http://localhost:3030/login?pageSize=10');
    await page.goto('http://localhost:3030/login?pageSize=10');
    await expect(page).toHaveURL('http://localhost:3030/login?pageSize=10');
    await page.waitForTimeout(5000);
  } finally {
    await page.context().close();
    const videoFiles = fs.readdirSync(videoDir);
    
    if (videoFiles.length > 0) {
      for (let i = videoFiles.length; i > 0; i--) {
        let videoFile = path.join(videoDir, videoFiles[i - 1]);
        await testInfo.attach('video', { path: videoFile });
      }
    }
  }
});

test.only('visual testing', async ({ page }) => {
  await page.goto('http://localhost:3030/login?pageSize=10');
  await expect(page).toHaveURL('http://localhost:3030/login?pageSize=10');
  await page.waitForTimeout(5000);
  const element = page.locator('section.fadeInUp') ;
  await expect(element).toHaveScreenshot();
  // const screenshot = await element.screenshot({ path: 'screenshot.png' });
  // const newScreenshot = await element.screenshot();
  // await screenshot.save('actual.png');
  // const comparisonResult = await page.compareScreenshots(referenceScreenshot, newScreenshot);

});

// test('using fixture context', async ({ page }) => {
//   await page.goto('http://localhost:3030/login?pageSize=10');
//   expect(await page.evaluate(() => window.innerWidth)).toBe(100);
//   expect(await page.evaluate(() => navigator.userAgent)).toBe('some custom ua');
//   await expect(page).toHaveURL('http://localhost:3030/login?pageSize=10');
// });