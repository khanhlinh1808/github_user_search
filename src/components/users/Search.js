import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'

import githubContext from '../../context/Github/githubContext'
import DebouncedFunc from '../../utils/DebouncedFunc'
import getDataApi from '../service/getDataApi'
import { SEARCH_USER } from '../../context/actionTypes'
import Spinner from '../../components/layout/Spinner'

const StyledSearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .searchForm {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  h2 {
    color: gray;
  }
  .logo-img {
    width: 150px;
    height: auto;
    margin-top: 30px;
  }
  .search-spinner {
    position: relative;
  }
  .searchBar {
    margin-top: 20px;
    padding: 15px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  input[type='text'] {
    width: 400px;
    background: transparent;
    background: rgba(0, 0, 0, 0.2);
    border: none;
    color: white;
  }
  input[type='text']:focus {
    outline: none;
    background: transparent;
    background: rgba(0, 0, 0, 0.2);
  }
`

const Search = () => {
  const [text, setText] = useState('')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const useGithubContext = useContext(githubContext)
  const onChange = (e) => {
    setText(e.target.value)
  }

  const Debounce = DebouncedFunc(onChange, 300)

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
      const body = document.querySelector('body').clientHeight
      const scrollHeight = window.scrollY + window.innerHeight
      if (body <= Math.ceil(scrollHeight) + 1) {
        setPage((prev) => prev + 1)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [text, page])

  return (
    <StyledSearchContainer className="search-container">
      <img
        src="https://cdn.iconscout.com/icon/free/png-256/github-3089487-2567439.png"
        alt="logo-img"
        className="logo-img"
      />
      <h2>WHO ARE YOU SEARCHING FOR ?</h2>
      <form className="searchForm">
        <input
          type="text"
          name="text"
          className="searchBar"
          placeholder="Searching for GitHub Users..."
          onChange={Debounce}
        />
      </form>
      {loading && <Spinner className="search-spinner" />}
    </StyledSearchContainer>
  )
}

export default Search
