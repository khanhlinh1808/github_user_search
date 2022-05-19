import { useEffect, useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import githubContext from '../../context/Github/githubContext'
import RepoList from '../repos/RepoList'
import getDataApi from '../service/getDataApi'
import { GET_USER, GET_REPOS } from '../../context/actionTypes'
import Spinner from '../layout/Spinner'

const StyledUserInfo = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  margin-top: 50px;
  a {
    display: flex;
    justify-content: center;
    color: white;
  }
  .UserBasicInfo {
    display: flex;
    flex-direction: column;
    align-items: center;
    .avatar-user {
      width: 200px;
      height: auto;
      border-radius: 50%;
      margin-top: 5px;
      margin-bottom: 20px;
      border: 4px solid #78259e;
    }
  }
  .UserRepoInfoContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 100px;
    .UserRepoInfo {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      li {
        margin-top: 40px;
        margin-bottom: 25px;
        list-style-type: none;
        padding: 0px 15px;
        color: white;
      }
      a {
        width: 50%;
      }
    }
  }
  h3 {
    color: white;
  }
`
const StyledRepoListContainer = styled.div`
  display: flex;
  justify-content: center;
  .RepoList {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 80%;
  }
`

const StyledButton = styled.button`
  background-color: #78259e;
  border: 1px solid #78259e;
  border-radius: 3px;
  color: white;
  font-family: 'Ubuntu', sans-serif;
  font-weight: 500;
  padding: 10px 25px;
  margin: 15px 10px;
  cursor: pointer;
`

const StyledHeader = styled.h4`
  padding-top: 50px;
  color: white;
  font-style: italic;
  text-align: center;
`

const UserRepoList = () => {
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)

  const useGithubContext = useContext(githubContext)
  const { user, repos } = useGithubContext.state
  const { login } = useParams()

  const getUser = async () => {
    setLoading(true)
    const result = await getDataApi(`/users/${login}`)
    setLoading(false)
    useGithubContext.dispatch({
      type: GET_USER,
      payload: result.data,
    })
  }

  const getRepo = async () => {
    setLoading(true)
    const result = await getDataApi(
      `/users/${login}/repos?&page=${page}&per_page=30`,
    )

    setLoading(false)
    if (page === 1) {
      useGithubContext.dispatch({
        type: GET_REPOS,
        payload: result.data,
      })
    } else {
      useGithubContext.dispatch({
        type: GET_USER,
        payload: [...useGithubContext.state.repos, ...result.data],
      })
    }
  }

  useEffect(() => {
    getUser()
    getRepo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const {
    name,
    avatar_url,
    html_url,
    public_repos,
    public_gists,
    followers,
    following,
  } = user

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
    <>
      {loading && <Spinner class="search-spinner" />}
      <StyledUserInfo className="UserInfo">
        <div className="UserBasicInfo">
          <img src={avatar_url} alt="userAvatar" className="avatar-user" />
          <h3>{login}</h3>
        </div>
        <div className="UserRepoInfoContainer">
          <h3>{name}</h3>
          <ul className="UserRepoInfo">
            <li>Public repos: {public_repos}</li>
            <li>Public gists: {public_gists}</li>
            <li>Follower: {followers}</li>
            <li>Following: {following}</li>
          </ul>
          <StyledButton>
            <a href={html_url}>Visit github profile</a>
          </StyledButton>
        </div>
      </StyledUserInfo>
      <StyledHeader>
        Click on a repository to read its README.md files
      </StyledHeader>
      <StyledRepoListContainer className="RepoListContainer">
        <div className="RepoList">
          <RepoList repos={repos} />
        </div>
      </StyledRepoListContainer>
    </>
  )
}

export default UserRepoList
