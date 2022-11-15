import React from 'react'
import { connect } from 'react-redux'
import { createActionAnecdote } from '../reducers/anecdoteReducer'
import { whenCreating } from '../reducers/notificationReducer'

const AnecdoteForm = (props) =>{
    const addAnecdote = async (event) => {
        event.preventDefault()
        const saying = event.target.anecdote.value
        props.createActionAnecdote(saying)
        event.target.anecdote.value = ''
        props.whenCreating(`you created "${saying}"`, 3000)
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

// takes the action creator functions from the store as a parameter and maps it to props (old alternative to useDispatch)
const mapDispatchToProps = {
    createActionAnecdote,
    whenCreating
}
const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm