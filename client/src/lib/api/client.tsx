import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://13.124.98.149:8080',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default apiClient
