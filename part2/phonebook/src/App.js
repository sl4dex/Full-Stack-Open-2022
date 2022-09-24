import { useState } from 'react'

const Button = ({type, text}) => <button type={type}>{text}</button>

const PersonForm = ({methods, vars}) => {
  const [addPerson, writingName, writingNum] = methods
  const [newName, newNum] = vars
  return(
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={writingName}/>
      </div>  
      <div>
        number: <input value={newNum} onChange={writingNum}/>
      </div>
      <div>
        <Button type="submit" text="add" />
      </div>
    </form>
  )
}

const PersonList = ({persons}) => persons.map(p => <p key={p.id}>{p.name} {p.num}</p>)


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
      <PersonForm methods={[addPerson, writingName, writingNum]} vars={[newName, newNum]}/>
      <h2>Numbers</h2>
      <PersonList persons={persons} />
    </div>
  )
}

export default App