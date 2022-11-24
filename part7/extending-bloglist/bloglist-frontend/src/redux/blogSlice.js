import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"

const blogSlice = createSlice({ 
    name: "blogs",
    initialState: [],
    reducers: {
        // adds all of the payload to the state (weird syntax, took me a while to figure out)
        setBlogs: (state, action) => action.payload,
    }
})

export const { setBlogs } = blogSlice.actions
export default blogSlice.reducer

export const initialBlogs = () => { 
    return async dispatch => { 
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}