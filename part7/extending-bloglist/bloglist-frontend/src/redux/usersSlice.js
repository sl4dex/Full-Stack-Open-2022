import { createSlice } from "@reduxjs/toolkit"
import userService from "../services/users"

const usersSlice = createSlice({ 
    name: "users",
    initialState: [],
    reducers: { 
        setUsers: (state, action) => action.payload
    }
})

export const { setUsers } = usersSlice.actions
export default usersSlice.reducer

export const initialUsers = () => { 
    return async dispatch => { 
        const users = await userService.getAll()
        dispatch(setUsers(users))
    }
}