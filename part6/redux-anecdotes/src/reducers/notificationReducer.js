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
// global scope to check if there was a previous notification timeout
let ideVote
export const whenVoting = (content, time) => {
    console.log(ideVote);
    if (ideVote)
        clearTimeout(ideVote)
    return async dispatch => {
        dispatch(notiVote(content))
        ideVote = setTimeout(function(){
            dispatch(removeNoti())
        }, time)
    }
}
let ideCreate
export const whenCreating = (content, time) => {
    if (ideCreate)
        clearTimeout(ideCreate)
    return async dispatch => {
        dispatch(notiCreate(content))
        ideCreate = setTimeout(function(){
            dispatch(removeNoti())
        }, time)
    }
}
export default notificationSlice.reducer