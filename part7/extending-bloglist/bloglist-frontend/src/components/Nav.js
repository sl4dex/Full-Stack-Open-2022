import React from "react"
import { Link } from "react-router-dom"
import NavDiv from '../styledComponents/Nav.css' 

const padding = {
    paddingRight: 5,
}
const Nav = () => {
    return (
        <NavDiv>
            <Link style={padding} to="/">Blogs</Link>
            <Link style={padding} to="/users">Users</Link>
        </NavDiv>
    )
}

export default Nav