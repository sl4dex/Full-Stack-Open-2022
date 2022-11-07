import { useSelector, useDispatch } from 'react-redux'
import { createActionVote, createActionAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state.sort((a, b) => b.votes - a.votes))
  const dispatch = useDispatch()

  const vote = (id) => {
    // para no tener como argumento una accion larga simplemente la metemos en la
    // nueva funcion createActionVote que se ubica es el archivo de reducers
    dispatch(createActionVote(id))
  }

  const addAnecdote = (event) => {
    event.preventDefault()
    const saying = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createActionAnecdote(saying))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}

      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App