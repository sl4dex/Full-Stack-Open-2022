import React from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { likeBlog } from "../redux/blogSlice"
import { notiLiking, notiHide } from "../redux/notificationSlice"
import blogApi from "../services/blogs"
import Comments from "./Comments"

const BlogView = () => {
    const dispatch = useDispatch()
    const id = useParams().id
    const blog = useSelector((state) => state.blogs.find(b => b.id === id))

    if (!blog)
        return null
    
    function updateBlog({ blog }) {
        blogApi.update(blog.id, blog)
        dispatch(likeBlog(blog))
        // shows the notification for 3 seconds
        dispatch(notiLiking(blog.title))
        setTimeout(() => {
          dispatch(notiHide())
        }, 3000)
    }

    return (
        <>
            <h1>{blog.title}</h1>
            <a href={blog.url}>{blog.url}</a> <br />
            {blog.likes} likes <span className='likes'></span>{' '}
            <button className='likeBtn' onClick={() => updateBlog({ blog })}>
                like
            </button>
            <br />
            added by {blog.user.username} <br />
            <Comments blog={blog} />
        </>
    )
}

export default BlogView