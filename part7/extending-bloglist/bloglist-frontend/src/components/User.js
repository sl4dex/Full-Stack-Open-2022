import React from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import UserDiv from '../styledComponents/User.css'

const User = () => {
    const id = useParams().id
    const user = useSelector((state) => state.users.find(u => u.id === id))
    const blogs = useSelector((state) => state.blogs)
    // this makes the page work when refreshing or when searching it directly from the url
    // idk why
    if (!user)
        return null

    return(
        <UserDiv>
            <h1>{user.name}</h1>
            <h2>added blogs</h2>
            <ul>
                {blogs.map(blog => {
                    if (blog.user.username === user.username)
                        return <li key={blog.id}>{blog.title}</li>
                })}
            </ul>
        </UserDiv>
    )
}

export default User