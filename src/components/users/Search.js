import React, { useState, useContext, useEffect } from 'react'

import githubContext from '../../context/Github/githubContext'
import Debounced from '../../utils/Debounce'
import getDataApi from '../service/getDataApi'
import { SEARCH_USER } from '../../context/actionTypes'
import Spinner from '../../components/layout/Spinner'

import '../../style/Searchbar.scss'

const Search = () => {
  const [text, setText] = useState('')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const useGithubContext = useContext(githubContext)
  const onChange = (e) => {
    setText(e.target.value)
  }

  const Debounce = Debounced(onChange, 300)

  const getUserList = async () => {
    setLoading(true)
    const result = await getDataApi(
      `https://api.github.com/search/users?q=${text}&page=${page}&per_page=10`,
    )
    setLoading(false)
    if (page === 1) {
      useGithubContext.dispatch({
        type: SEARCH_USER,
        payload: result.data.items,
      })
    } else {
      useGithubContext.dispatch({
        type: SEARCH_USER,
        payload: [...useGithubContext.state.userList, ...result.data.items],
      })
    }
  }

  useEffect(() => {
    if (text) {
      getUserList()
    }
  }, [text, page])

  useEffect(() => {
    setPage(1)
  }, [text])

  useEffect(() => {
    const handleScroll = () => {
      let body = document.querySelector('body').clientHeight
      let scrollHeight = window.scrollY + window.innerHeight
      if (body <= Math.ceil(scrollHeight + 1)) {
        setPage((prev) => prev + 1)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="search-container">
      <form id="searchForm">
        <input
          type="text"
          name="text"
          id="searchBar"
          placeholder="Searching for GitHub Users..."
          onChange={Debounce}
        />
      </form>
      {loading && <Spinner className="search-spinner" />}
    </div>
  )
}

export default Search
