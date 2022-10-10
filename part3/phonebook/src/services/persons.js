import axios from 'axios'

const url = 'http://localhost:3001/api/persons'

const createP = newP => {
    const response = axios.post(url, newP)
    return response.then(resp => resp.data)
}

export default createP
