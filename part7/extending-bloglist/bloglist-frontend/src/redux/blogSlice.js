import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"

const blogSlice = createSlice({ 
    name: "blogs",
    initialState: [],
    reducers: {
        // adds all of the payload to the state (weird syntax, took me a while to figure out)
        setBlogs: (state, action) => action.payload,
        likeBlog: (state, action) => { 
            const id = action.payload.id
            state.map(b => b.id === id ? b.likes++ : b)
        },
        delBlog: (state, action) => {
            const id = action.payload
            return state.filter(b => b.id !== id)
        }
    }
})

export const { setBlogs, likeBlog, delBlog } = blogSlice.actions
export default blogSlice.reducer

export const initialBlogs = () => { 
    return async dispatch => { 
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}