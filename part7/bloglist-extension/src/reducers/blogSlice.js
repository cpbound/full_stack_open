import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlogs(state, action) {
      state.push(action.payload)
    },
  }
})

export const { setBlogs, appendBlogs } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = blog => {
  return async dispatch => {
    console.log('Creating blog', blog)
    const newBlog = await blogService.create(blog)
    console.log('New blog created', newBlog)
    dispatch(appendBlogs(newBlog))
  }
}

export default blogSlice.reducer
