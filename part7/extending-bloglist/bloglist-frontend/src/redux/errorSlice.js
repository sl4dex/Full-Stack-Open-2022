import { createSlice } from '@reduxjs/toolkit'

const errorSlice = createSlice({ 
    name: 'error',
    initialState: {
        err: ''
    },
    reducers: {
        badLogin: (state) => {state.err = 'Wrong credentials'},
        errHide: (state) => {state.err = ''}
     }
})

export const { badLogin, errHide } = errorSlice.actions
export default errorSlice.reducer