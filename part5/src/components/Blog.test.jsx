import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import Blog from './Blog'
import { beforeEach, describe, expect } from 'vitest'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Gazza Chuff',
    url: 'www.test.test',
    likes: '0',
    user: {
      username: 'GCHuff',
      id: 'test',
    },
  }

  const user = {
    username: 'test',
    name: 'Kenny Loggedin',
    id: 'usertest',
  }

  const { container } = render(<Blog blog={blog} user={user} />)

  const div = container.querySelector('.visible')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  expect(div).toHaveTextContent('Author: Gazza Chuff')
})

test('renders additional content after clicking view button', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Gazza Chuff',
    url: 'www.test.test',
    likes: '0',
    user: {
      username: 'GCHuff',
      id: 'test',
    },
  }

  const user = {
    username: 'test',
    name: 'Kenny Loggedin',
    id: 'usertest',
  }

  const { container } = render(<Blog blog={blog} user={user} />)

  const div = container.querySelector('.hidden')

  expect(div).toHaveTextContent('www.test.test')
  expect(div).toHaveTextContent('0 ♥️')
})
