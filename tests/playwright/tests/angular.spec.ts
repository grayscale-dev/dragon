import { test, expect } from '@playwright/test';

test('angular: input updates state and value', async ({ page }) => {
  await page.goto('/');
  const input = page.locator('dui-input').locator('input');

  await input.fill('hello');
  await expect(page.locator('#out')).toHaveText('hello');
  await expect(page.locator('dui-input')).toHaveJSProperty('value', 'hello');

  await input.blur();
  await expect(page.locator('#changed')).toHaveText('hello');
});

test('angular: programmatic state updates component', async ({ page }) => {
  await page.goto('/');
  await page.locator('#set-value').click();
  await expect(page.locator('dui-input').locator('input')).toHaveValue('programmatic');
  await expect(page.locator('#out')).toHaveText('programmatic');
});
