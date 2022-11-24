import React from "react"
import { useSelector } from "react-redux"
import Blog from "./Blog"

const BlogList = ({ user }) => {
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