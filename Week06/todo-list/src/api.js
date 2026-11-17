
import axios from 'axios'

const BASE = 'http://localhost:3001'

export const fetchTodos = async () => {
  const response = await axios.get(`${BASE}/todos`)
  return response.data
}

export const createTodo = async (title, bpm) => {
  // send bpm with the title so it actually saves
  const response = await axios.post(`${BASE}/todos`, {
    title,
    bpm,
    done: false,
  })
  return response.data
}

export const deleteTodo = async (id) => {
  await axios.delete(`${BASE}/todos/${id}`)
}

export const updateTodo = async (todo) => {
  // PUT sends the whole song, including the bpm
  const response = await axios.put(`${BASE}/todos/${todo.id}`, todo)
  return response.data
}

export const toggleTodo = async (id, done) => {
  // PATCH only changes whether it is done
  const response = await axios.patch(`${BASE}/todos/${id}`, {done})
  return response.data
}
