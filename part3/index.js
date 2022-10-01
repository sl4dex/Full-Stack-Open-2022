const express = require('express')
const app = express()

let persons = [
    {
        "name": "Salvador diaz",
        "num": "092 362 123",
        "id": 4
      },
      {
        "name": "Oriana Goro ",
        "num": "098333333",
        "id": 5
      },
      {
        "name": "Rosana Budes",
        "num": "123 4456 777",
        "id": 6
      }
]

app.get('/', (request, response) => {
    // we use .send because its a string
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    // we use .json beacause its json notation 
    response.json(persons)
})

// using express two dot notation, :id will be an arbitrary string, accesed by request.params.id
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(elem => elem.id === id) 
    if (person)
        response.json(person)
    else
        response.status(404).end()
})

app.get('/api/info', (request, response) => {
    var currentTime = new Date();
    response.send(`<p>phonebook has info for ${persons.length} people</p> ${currentTime}`)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})