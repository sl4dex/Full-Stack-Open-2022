import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createActionVote } from '../reducers/anecdoteReducer'



const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.sort((a, b) => b.votes - a.votes))
    const dispatch = useDispatch()

    const vote = (id) => {
        // para no tener como argumento una accion larga simplemente la metemos en la
        // nueva funcion createActionVote que se ubica es el archivo de reducers
        dispatch(createActionVote(id))
    }
    return(
        <>
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
        </>
    )
}

export default AnecdoteList