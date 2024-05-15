import { useState } from 'react'

const CreateBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const newBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={newBlog}>
      <div>
        <input type="text" name="Title" placeholder='Title' value={title} onChange={handleTitleChange} />
      </div>
      <div>
        <input type="text" name="Author" placeholder='Author' value={author} onChange={handleAuthorChange} />
      </div>
      <div>
        <input type="text" name="Url" placeholder='URL' value={url} onChange={handleUrlChange} />
      </div>
      <br />
      <button type="click">Create</button>
    </form>
  )
}

export default CreateBlogForm
