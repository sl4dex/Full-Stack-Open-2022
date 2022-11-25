import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import User from "./User"

const Users = () => { 
    const users = useSelector((state) => state.users)
    const blogs = useSelector((state) => state.blogs)
    return (
        <div>
            <h1>Users</h1>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                            <tr key={user.id}>
                                <td><Link to={user.id} element={<User />}>{user.name}</Link></td>
                                <td>{blogs.reduce( function(acc, curr) {
                                        if(curr.user.username === user.username) 
                                            return acc += 1 
                                        else
                                            return acc
                                    }, 0
                                    )}
                                </td>
                            </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Users