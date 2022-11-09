import React from 'react'
import { useDispatch } from 'react-redux'
import { createActionAnecdote } from '../reducers/anecdoteReducer'
import { whenCreating } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () =>{
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const saying = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnecdote = await anecdoteService.createNew(saying)
        dispatch(createActionAnecdote(newAnecdote))
        dispatch(whenCreating(saying))
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