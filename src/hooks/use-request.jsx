import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://prosper-conversations-beta.onrender.com',
  // Set a default timeout of 20 seconds
  timeout: 20000,
  headers: {
    'X-Api-Key': 'test-challenge',
    'X-Organization': 'test',
  },
})

const useRequest = url => {
  const request = async body => {
    const { data, status } = await instance.post(url, body)
    return { data, status }
  }

  return { request }
}

export default useRequest
