import { createSlice } from  '@reduxjs/toolkit'

const notiSlice = createSlice({
  name: 'notification',
  initialState: {
    message: ''
  },
  reducers: {
    notiCreating: (state, action) => {state.message = `You created ${action.payload.title} by ${action.payload.author}`},
    notiLiking: (state, action) => {state.message = `You liked ${action.payload}`},
    notiLogin: (state, action) => {state.message = `Logged in as ${action.payload}`},
    notiLoginBad: (state) => {state.message = 'Wrong credentials'},
    notiHide: (state) => {state.message = ''}
  }
})

// export the actions so you can call them in your components
export const { notiCreating, notiLiking, notiHide, notiLogin, notiLoginBad } = notiSlice.actions
// export the reducer so you can call it in your store
export default notiSlice.reducer