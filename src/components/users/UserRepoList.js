import { useEffect, useContext, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'

import githubContext from '../../context/Github/githubContext'
import RepoList from '../repos/RepoList'
import getDataApi from '../service/getDataApi'
import { GET_USER, GET_REPOS } from '../../context/actionTypes'
import Spinner from '../layout/Spinner'

const StyledUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  a {
    display: flex;
    justify-content: center;
    color: black;
  }
  .UserBasicInfo {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .avatar-user {
    width: 200px;
    height: auto;
    border-radius: 50%;
    margin-top: 5px;
    margin-bottom: 20px;
  }
  h3,
  h5 {
    color: black;
  }
  .UserRepoInfo {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin-top: 20px;
    li {
      color: black;
      list-style-type: none;
    }
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

const StyledBackButton = styled.button`
  color: white;
  text-align: center;
  text-decoration: none;
  font-size: 12px;
  margin-top: 30px;
  cursor: pointer;
  background-color: black;
  padding: 10px 24px;
  border-radius: 8px;
  margin-left: 5%;
`

const UserRepoList = () => {
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)

  const useGithubContext = useContext(githubContext)
  const { user, repos } = useGithubContext.state
  const { login } = useParams()

  const getUser = async () => {
    setLoading(true)
    const result = await getDataApi(`https://api.github.com/users/${login}`)
    setLoading(false)
    useGithubContext.dispatch({
      type: GET_USER,
      payload: result.data,
    })
  }

  const getRepo = async () => {
    setLoading(true)
    const result = await getDataApi(
      `https://api.github.com/users/${login}/repos?&page=${page}&per_page=10`,
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
  }, [])

  const {
    name,
    avatar_url,
    html_url,
    public_repos,
    bio,
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
      <Link to="/">
        <StyledBackButton className="btn-back">Back</StyledBackButton>
      </Link>
      <StyledUserInfo className="UserInfo">
        <div className="UserBasicInfo">
          <img src={avatar_url} alt="userAvatar" className="avatar-user" />
          <h3>{name}</h3>
          <h5>{bio}</h5>
        </div>
        <ul className="UserRepoInfo">
          <li>Public repos: {public_repos}</li>
          <li>Public gists: {public_gists}</li>
          <li>Follower: {followers}</li>
          <li>Following: {following}</li>
        </ul>
        <a href={html_url}>Visit github profile</a>
      </StyledUserInfo>
      <StyledRepoListContainer className="RepoListContainer">
        <div className="RepoList">
          <RepoList repos={repos} />
        </div>
      </StyledRepoListContainer>
    </>
  )
}

export default UserRepoList
