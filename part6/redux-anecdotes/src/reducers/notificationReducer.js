import { createSlice } from '@reduxjs/toolkit'

const initialState = {value: '', style: {display: 'none'}}
const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        whenVoting(state, action) {
            state.value = `You voted '${action.payload}'`
            state.style = {border: 'solid', padding: 10, borderWidth: 1}
            return state
        },
        whenCreating(state, action) {
            state.style = {border: 'solid', padding: 10, borderWidth: 1}
            return state = `You created '${action.payload}'`
        },
        removeNoti(state, action) {
            return state = initialState
        }
    }
})

export const { whenVoting, whenCreating, removeNoti } = notificationSlice.actions
export default notificationSlice.reducer