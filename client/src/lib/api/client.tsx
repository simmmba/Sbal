import axios from 'axios'

const apiClient = axios.create({
  // baseURL: 'http://70.12.247.32:8080',

  baseURL: 'http://13.124.98.149:8080',
  headers: {
    'Content-Type': 'application/json'
  }
})

/*
// API 주소
client.default.baseURL = ``

// 헤더 설정
client.defaults.headers.common['Authorization'] = ``

//
*/

export default apiClient
