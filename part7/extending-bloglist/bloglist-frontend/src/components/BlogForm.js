import { React, useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { notiCreating } from '../redux/notificationSlice'

const BlogForm = ({
  setNewTitle,
  setNewAuthor,
  setNewUrl,
  newTitle,
  newAuthor,
  newUrl,
}) => {
  const dispatch = useDispatch()
  const [blogformVisible, setblogformVisible] = useState(false)
  const hideWhenVisible = { display: blogformVisible ? 'none' : '' }
  const showWhenVisible = { display: blogformVisible ? '' : 'none' }

  const writingTitle = (event) => setNewTitle(event.target.value)
  const writingAuthor = (event) => setNewAuthor(event.target.value)
  const writingUrl = (event) => setNewUrl(event.target.value)

  function addblog() {
    blogService.create({ title: newTitle, author: newAuthor, url: newUrl })
    setblogformVisible(false)
    dispatch(notiCreating({title: newTitle, author: newAuthor}))
  }
  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={() => setblogformVisible(true)}>new blog</button>
      </div>
      <div style={showWhenVisible}>
        <form onSubmit={addblog}>
          <h2>New blog</h2>
          <div>
            title <input id='title' value={newTitle} onChange={writingTitle} />
          </div>
          <div>
            author{' '}
            <input id='author' value={newAuthor} onChange={writingAuthor} />
          </div>
          <div>
            url <input id='url' value={newUrl} onChange={writingUrl} />
          </div>
          <button type='submit'>post</button>
        </form>
        <button onClick={() => setblogformVisible(false)}>cancel</button>
      </div>
    </>
  )
}

BlogForm.propTypes = {
  setNewTitle: PropTypes.func.isRequired,
  setNewAuthor: PropTypes.func.isRequired,
  setNewUrl: PropTypes.func.isRequired,
  newTitle: PropTypes.string.isRequired,
  newAuthor: PropTypes.string.isRequired,
  newUrl: PropTypes.string.isRequired,
}

export default BlogForm
