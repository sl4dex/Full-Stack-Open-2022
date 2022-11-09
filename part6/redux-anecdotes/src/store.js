import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer, { appendAnecdote } from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import anecdotesService from './services/anecdotes'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    notification: notificationReducer
  }
})
// sends entire GET response (anecdotes array) to the reducer
anecdotesService.getAll().then(anecs => store.dispatch(appendAnecdote(anecs)))
console.log(store.getState())

export default store