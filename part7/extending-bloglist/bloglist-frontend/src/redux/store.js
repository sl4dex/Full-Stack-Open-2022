import { configureStore } from '@reduxjs/toolkit'
import notiReducer from './notificationSlice'
import errorReducer from './errorSlice'

export default configureStore({ 
    reducer: {
        notification: notiReducer,
        error: errorReducer
    }
})