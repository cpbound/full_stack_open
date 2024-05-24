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
    await request.post('http:localhost:3001/api/users', {
      data: {
        name: 'Anne Other',
        username: 'AnneOther',
        password: 'testpassword2',
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

    test('A blog can be deleted', async ({ page }) => {
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

    test('Only a user who created a blog can delete it', async ({ page }) => {
      await page.getByRole('button', { name: 'Create new blog' }).click()

      await page.fill('input[name="Title"]', 'Test Blog')
      await page.fill('input[name="Author"]', 'Test Author')
      await page.fill('input[name="Url"]', 'http://testblog.com')
      await page.getByRole('button', { name: 'Create' }).click()

      await page.getByRole('button', { name: 'Logout' }).click()

      await page.fill('input[name="Username"]', 'AnneOther')
      await page.fill('input[name="Password"]', 'testpassword2')
      await page.getByRole('button', { name: 'Login' }).click()

      await page.getByRole('button', { name: 'View' }).click()

      await expect(
        page.getByRole('button', { name: 'Delete Blog' })
      ).not.toBeVisible()
    })

    test.only('Blogs are ordered by likes', async ({ page }) => {
      await page.getByRole('button', { name: 'Create new blog' }).click()

      await page.fill('input[name="Title"]', 'Test Blog 1')
      await page.fill('input[name="Author"]', 'Test Author 1')
      await page.fill('input[name="Url"]', 'http://testblog1.com')
      await page.getByRole('button', { name: 'Create' }).click()

      await page.getByRole('button', { name: 'View' }).click()
      await page.getByRole('button', { name: 'Like' }).dblclick()

      await page.getByRole('button', { name: 'Logout' }).click()

      await page.fill('input[name="Username"]', 'AnneOther')
      await page.fill('input[name="Password"]', 'testpassword2')
      await page.getByRole('button', { name: 'Login' }).click()

      await page.getByRole('button', { name: 'Create new blog' }).click()
      await page.fill('input[name="Title"]', 'Test Blog2')
      await page.fill('input[name="Author"]', 'Anne Other')
      await page.fill('input[name="Url"]', 'http://testblog.com')
      await page.getByRole('button', { name: 'Create' }).click()

      await page.getByRole('button', { name: 'View' }).click()

      await page.getByRole('button', { name: 'Like' }).click()

      await page.getByRole('button', { name: 'Logout' }).click()

      await page
        .locator('div')
        .filter({
          hasText:
            /^Viewhttp:\/\/testblog1\.com2 ♥️ LikeAdded by: testuserClose$/,
        })
        .getByRole('button').click()

      await page
        .locator('div')
        .filter({
          hasText:
            /^Viewhttp:\/\/testblog\.com0 ♥️ LikeAdded by: AnneOtherClose$/,
        })
        .getByRole('button').click()

      await expect(page.locator('div.blogStyle').first()).toContainText('2 ♥️')
    })
  })
})
