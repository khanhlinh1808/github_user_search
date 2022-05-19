import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'

import githubContext from '../../context/Github/githubContext'
import DebouncedFunc from '../../utils/DebouncedFunc'
import getDataApi from '../service/getDataApi'
import { SEARCH_USER } from '../../context/actionTypes'
import Spinner from '../../components/layout/Spinner'

const ADDITIONAL_HEIGHT = 1

const StyledSearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  .searchForm {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
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
    font-family: 'Ubuntu', sans-serif;
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
      `/search/users?q=${text}&page=${page}&per_page=10`,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, page])

  useEffect(() => {
    setPage(1)
  }, [text])

  useEffect(() => {
    const handleScroll = () => {
      const body = document.querySelector('body').clientHeight
      const scrollHeight = window.scrollY + window.innerHeight
      if (body <= Math.ceil(scrollHeight) + ADDITIONAL_HEIGHT) {
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
