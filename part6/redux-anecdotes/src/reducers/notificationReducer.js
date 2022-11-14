import { createSlice } from '@reduxjs/toolkit'

const initialState = {value: '', style: {display: 'none'}}
const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        notiVote(state, action) {
            state.value = action.payload
            state.style = {border: 'solid', padding: 10, borderWidth: 1}
            return state
        },
        notiCreate(state, action) {
            state.value = action.payload
            state.style = {border: 'solid', padding: 10, borderWidth: 1}
            return state
        },
        removeNoti(state, action) {
            return state = initialState
        }
    }
})

export const {notiVote, notiCreate, removeNoti } = notificationSlice.actions
export const whenVoting = (content, time) => {
    return async dispatch => {
        dispatch(notiVote(content))
        setTimeout(function(){
            dispatch(removeNoti())
        }, time)
    }
}
export const whenCreating = (content, time) => {
    return async dispatch => {
        dispatch(notiCreate(content))
        setTimeout(function(){
            dispatch(removeNoti())
        }, time)
    }
}
export default notificationSlice.reducer