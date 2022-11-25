import React from "react"
import { Link } from "react-router-dom"

const padding = {
    paddingRight: 5,
}
const Nav = () => {
    return (
        <>
            <Link style={padding} to="/">Blogs</Link>
            <Link style={padding} to="/users">Users</Link>
        </>
    )
}

export default Nav