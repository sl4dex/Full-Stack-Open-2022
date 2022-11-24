import React from "react"
import { useDispatch, useSelector } from "react-redux"
import Blog from "./Blog"

const BlogList = ({ user }) => {
    const dispatch = useDispatch()
    const blogs = useSelector((state) => state.blogs)

    return (
        <div>
            <h2>Blogs</h2>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} user={user}/>
            ))}
        </div>
    )
}

export default BlogList