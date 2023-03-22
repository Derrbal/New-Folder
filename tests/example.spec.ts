import { test, expect } from '@playwright/test';

test('using fixture context', async ({ page }) => {
  await page.goto('http://localhost:3030/login?pageSize=10');
  expect(await page.evaluate(() => window.innerWidth)).toBe(100);
  expect(await page.evaluate(() => navigator.userAgent)).toBe('some custom ua');
  await expect(page).toHaveURL('http://localhost:3030/login?pageSize=10');
});

test('manually created context', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('http://localhost:3030/login?pageSize=10');
  expect(await page.evaluate(() => window.innerWidth)).toBe(100);
  expect(await page.evaluate(() => navigator.userAgent)).toBe('some custom ua');
  await expect(page).toHaveURL('http://localhost:3030/login?pageSize=10');
});