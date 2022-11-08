import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

// export const createActionVote = (id) => {
//   return {type: 'VOTE', data: {id}}
// }
// export const createActionAnecdote = (saying) => {
//   return {type: 'ADD', data: {saying}}
// }
// const reducer = (state = initialState, action) => {
//   console.log('state now: ', state)
//   console.log('action', action)
//   switch (action.type) {
//     case 'VOTE':
//       return state.map(a => a.id === action.data.id ? {...a, votes: a.votes + 1}: a)
//     case 'ADD':
//       return state.concat(asObject(action.data.saying))
//     default: return state
//   }
// }

const initialState = anecdotesAtStart.map(asObject)
// name, initial-state, reducers
const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createActionVote(state, action) {
      return state.map(a => a.id === action.payload ? {...a, votes: a.votes + 1}: a)
    },
    createActionAnecdote(state, action) {
      const saying = action.payload
      state.push({
        content: saying,
        votes: 0,
        id: getId(),
      })
    }
  }
})

export const { createActionVote, createActionAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer