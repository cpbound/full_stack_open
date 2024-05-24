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

      await expect(
        page.getByText('[|[| Test User logged in. |]|]')
      ).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.fill('input[name="Username"]', 'testuser')
      await page.fill('input[name="Password"]', 'wrongpassword')
      await page.getByRole('button', { name: 'Login' }).click()

      await expect(page.getByText('Wrong credentials')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.fill('input[name="Username"]', 'testuser')
      await page.fill('input[name="Password"]', 'testpassword')
      await page.getByRole('button', { name: 'Login' }).click()
    })

    test('A blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'Create new blog' }).click()

      await page.fill('input[name="Title"]', 'Test Blog')
      await page.fill('input[name="Author"]', 'Test Author')
      await page.fill('input[name="Url"]', 'http://testblog.com')
      await page.getByRole('button', { name: 'Create' }).click()

      await expect(
        page.getByRole('heading', { name: 'Test Blog' })
      ).toBeVisible()
      await expect(page.getByText('Author: Test Author')).toBeVisible()
    })

    test('A blog can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'Create new blog' }).click()

      await page.fill('input[name="Title"]', 'Test Blog')
      await page.fill('input[name="Author"]', 'Test Author')
      await page.fill('input[name="Url"]', 'http://testblog.com')
      await page.getByRole('button', { name: 'Create' }).click()

      await page.getByRole('button', { name: 'View' }).click()
      await page.getByRole('button', { name: 'Like' }).click()

      await expect(page.getByText('1 ♥️')).toBeVisible()
    })

    test.only('A blog can be deleted', async ({ page }) => {
      await page.getByRole('button', { name: 'Create new blog' }).click()

      await page.fill('input[name="Title"]', 'Test Blog')
      await page.fill('input[name="Author"]', 'Test Author')
      await page.fill('input[name="Url"]', 'http://testblog.com')
      await page.getByRole('button', { name: 'Create' }).click()

      await page.getByRole('button', { name: 'View' }).click()

      page.on('dialog', async (dialog) => {
        expect(dialog.type()).toContain('confirm')
        expect(dialog.message()).toContain(
          'Are you sure you want to delete Test Blog by Test Author?'
        )
        await dialog.accept()
      })

      await page.getByRole('button', { name: 'Delete Blog' }).click()

      await expect(
        page.getByText(
          'Blog deleted. Banned. Banned. Banned. Banned. Gone. Forever'
        )
      ).toBeVisible()
    })
  })
})
