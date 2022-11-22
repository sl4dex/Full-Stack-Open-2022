import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/login'

// sends post to my node backend and returns response
const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}`, credentials)
  return response.data
}

export default { login }
