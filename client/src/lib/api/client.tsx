import axios from 'axios'

const apiClient = axios.create({
  // baseURL: 'http://70.12.247.32:8080',
  // baseURL: 'http://70.12.246.32:8080',
  baseURL: 'http://13.124.98.149:8080',
  // baseURL: 'http://192.168.43.33:8080',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default apiClient
