import { useState, useEffect } from 'react'
import axios from 'axios'
import createP from './services/persons'

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

const PersonList = ({persons, setPersons}) => persons.map(  p => <p key={p.id}>{p.name} {p.num} <button onClick={() => {
  if(window.confirm(`Delete ${p.name} ?`)){
    axios
      .delete(`http://localhost:3001/persons/${p.id}`)
      .then(setPersons(persons.filter(pe => pe.id !== p.id)))
  }
}}>delete</button></p>)


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) =>{
    event.preventDefault()
    for (let key in persons) {
      if (persons[key].name === newName) {
        if(window.confirm(`"${newName}" is already added to phonebook, replace the old number with a new one?`)) {
          // find person in list where name == input value
          const person = persons.find(p => p.name === persons[key].name)
          // create new identical object copy except new number 
          const changedNumber = {...person, num: newNum}
          // send it with put
          axios.put(`http://localhost:3001/persons/${person.id}`, changedNumber)
            // Now to reflect the hanges in the DOM we do an exact copy of the persons list
            // except on the item having the duplicate name, on that one we change the number to the new one
            .then(response => setPersons(persons.map(p => p.num == person.num ? response.data : p)))
        }
        return
      }
    }
    const newPerson = {
      name: newName,
      // leaving id generation to the server
      //id: persons.length + 1,
      num: newNum
    }
    createP(newPerson)
      .then(newNote => {
        setPersons(persons.concat(newNote))
        setNewName('')
        setNewNum('')
      })
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
      <PersonList persons={persons} setPersons={setPersons} />
    </div>
  )
}

export default App