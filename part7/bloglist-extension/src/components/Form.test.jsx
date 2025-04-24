import { render, screen } from '@testing-library/react'
import Form from './Form'
import userEvent from '@testing-library/user-event'

test('<Form /> updates parent state and calls onSubmit', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<Form createBlog={createBlog} />)

  const inputTitle = screen.getByPlaceholderText('Title')
  const inputAuthor = screen.getByPlaceholderText('Author')
  const inputUrl = screen.getByPlaceholderText('URL')

  const createButton = screen.getByText('Create')

  await user.type(inputTitle, 'Blog Title')
  await user.type(inputAuthor, 'Blog Author')
  await user.type(inputUrl, 'www.blogurl.com')

  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)

  expect(createBlog.mock.calls[0][0].title).toBe('Blog Title')
  expect(createBlog.mock.calls[0][0].author).toBe('Blog Author')
  expect(createBlog.mock.calls[0][0].url).toBe('www.blogurl.com')
})
