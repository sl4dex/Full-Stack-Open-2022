import { useState } from 'react'



const App = () => {
  const handl = (arr) => {
    // copies points array
    const copy = { ...arr }
    //copy now reflects the new changes
    copy[selected] += 1
    //now we update points state with copy's value
    setPoints(copy)
  }
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  const [points, setPoints] = useState(new Uint8Array(7))
  const [selected, setSelected] = useState(0)

  return (
    <div>
      {anecdotes[selected]} <br/>
      <p>has {points[selected]} votes</p>
      <button onClick={() => handl(points)}>vote</button>
      <button onClick={() => setSelected(selected + 1)}>next anecdote</button>
    </div>
  )
}

export default App