import React from 'react'
import { useDispatch } from 'react-redux'
import { createActionAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () =>{
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const saying = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createActionAnecdote(saying))
    }
    return (
    <>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
            <div><input name='anecdote' /></div>
            <button type="submit">create</button>
        </form>
    </>
    )
}

export default AnecdoteForm