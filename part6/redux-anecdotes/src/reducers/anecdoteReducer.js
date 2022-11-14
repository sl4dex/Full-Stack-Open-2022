import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteA(state, action) {
      return state.map(a => a.id === action.payload.id ? {...a, votes: a.votes + 1}: a)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { appendAnecdote, setAnecdotes, voteA } = anecdoteSlice.actions
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
export const createActionVote = (id, content, votes) => {
  return async dispatch => {
    const updatedAnec = await anecdoteService.update(id, content, votes)
    dispatch(voteA(updatedAnec))
  }
}
export default anecdoteSlice.reducer