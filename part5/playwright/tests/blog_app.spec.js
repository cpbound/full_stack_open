const { test, describe, beforeEach, expect } = require('@playwright/test')

describe('Blog App', () => {

  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('front page can be opened', async ({ page }) => {

    await expect(page.getByText('Blog List')).toBeVisible()
  })

  test('Login form is shown', async ({ page }) => {

    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()

    await expect(page.locator('input[name="Username"]')).toBeVisible()
    await expect(page.locator('input[name="Password"]')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible()
  })
})
