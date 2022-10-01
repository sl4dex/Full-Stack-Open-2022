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
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    response.send(persons)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})