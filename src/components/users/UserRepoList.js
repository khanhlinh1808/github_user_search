import { useEffect, useContext, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import githubContext from '../../context/Github/githubContext'
import RepoList from '../repos/RepoList'
import getDataApi from '../service/getDataApi'
import { GET_USER, GET_REPOS } from '../../context/actionTypes'
import Spinner from '../layout/Spinner'
import '../../style/UserRepoList.scss'

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <button className="btn-back">Back</button>
      </Link>
      <div className="UserInfo">
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
      </div>
      <div className="RepoListContainer">
        <div className="RepoList">
          <RepoList repos={repos} />
        </div>
      </div>
    </>
  )
}

export default UserRepoList
