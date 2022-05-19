import githubContext from './Github/githubContext'
import { useReducer } from 'react'
import githubReducer from './Github/githubReducer'

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(githubReducer, {
    userList: [],
    user: {},
    repos: [],
  })
  const value = {
    state,
    dispatch,
  }
  return (
    <githubContext.Provider value={value}>{children}</githubContext.Provider>
  )
}

export default Provider
