import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createActionVote } from '../reducers/anecdoteReducer'



const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotesSorted = useSelector(state => state.anecdotes) //sort((a, b) => b.votes - a.votes)

    return(
        <>
            {anecdotesSorted.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => dispatch(createActionVote(anecdote.id))}>vote</button>
                </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList