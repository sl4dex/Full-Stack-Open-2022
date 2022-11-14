import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createActionVote(state, action) {
      return state.map(a => a.id === action.payload ? {...a, votes: a.votes + 1}: a)
    },
    // createActionAnecdote(state, action) {
    //   // const saying = action.payload
    //   // state.push({
    //   //   content: saying,
    //   //   votes: 0,
    //   //   id: getId(),
    //   // })
    //   state.push(action.payload)
    // },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { createActionVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
// redux-thunk exports
export const initializeAnecs = () => {
  return async dispatch => {
    const anecs = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecs))
  }
}
export const createActionAnecdote = content => {
  return async dispatch => {
    const newAnec = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnec))
  }
}
export default anecdoteSlice.reducer