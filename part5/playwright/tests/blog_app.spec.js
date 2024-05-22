const { test, describe, beforeEach, expect } = require('@playwright/test')

describe('Blog App', () => {
  beforeEach(async ({ page, request }) => {

    await request.post('http:localhost:3001/api/testing/reset')
    await request.post('http:localhost:3001/api/users', {
      data: {
        name: 'Test User',
        username: 'testuser',
        password: 'testpassword',
      },
    })

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

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.fill('input[name="Username"]', 'testuser')
      await page.fill('input[name="Password"]', 'testpassword')
      await page.getByRole('button', { name: 'Login' }).click()

      await expect(page.getByText('[|[| Test User logged in. |]|]')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.fill('input[name="Username"]', 'testuser')
      await page.fill('input[name="Password"]', 'wrongpassword')
      await page.getByRole('button', { name: 'Login' }).click()

      await expect(page.getByText('Wrong credentials')).toBeVisible()
    })
  })
})
