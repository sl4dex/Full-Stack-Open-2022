import React from "react"
import { useSelector } from "react-redux"
import Blog from "./Blog"
import BlogListDiv from "../styledComponents/BlogList.css"

const BlogList = () => {
    const blogs = useSelector((state) => state.blogs)

    return (
        <BlogListDiv>
            <h2>Blogs</h2>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </BlogListDiv>
    )
}

export default BlogList