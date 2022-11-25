import { createSlice } from "@reduxjs/toolkit"

const loggedUserSlice = createSlice({ 
    name: "loggedUser",
    initialState: [],
    reducers: { 
        setUser: (state, action) => action.payload,
        logIn: (state, action) => { 
            return state.concat(action.payload)
        }
    }
})

export const { setUsers, logIn } = loggedUserSlice.actions
export default loggedUserSlice.reducer