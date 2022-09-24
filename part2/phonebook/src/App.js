import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      id: 1}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')

  const addPerson = (event) =>{
    event.preventDefault()
    for (let key in persons) {
      if (persons[key].name === newName) {
        alert(`"${newName}" is already added to phonebook`)
        return
      }
    }
    const newPerson = {
      name: newName,
      id: persons.length + 1,
      num: newNum
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNum('')
  }

  const writingName = (event) => {
    setNewName(event.target.value)
  }
  const writingNum = (event) => {
    setNewNum(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={writingName}/>
        </div>
        <div>
          number: <input value={newNum} onChange={writingNum}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(p => <p key={p.id}>{p.name} {p.num}</p>)}
    </div>
  )
}

export default App