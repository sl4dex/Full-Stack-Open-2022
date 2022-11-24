import { configureStore } from '@reduxjs/toolkit'
import notiReducer from './notificationSlice'
import errorReducer from './errorSlice'
import blogReducer from './blogSlice'
import userSlice from './loggeduserSlice'
import usersSlice from './usersSlice'

export default configureStore({ 
    reducer: {
        notification: notiReducer,
        error: errorReducer,
        blogs: blogReducer,
        loggedUser: userSlice,
        users: usersSlice
    }
})