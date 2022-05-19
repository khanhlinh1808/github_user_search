import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import atob from 'atob'
import styled from 'styled-components'

import getDataApi from '../service/getDataApi'

const StyledRepoCardContainer = styled.div`
  padding: 1rem;
  margin: 0.7rem 0;
  color: black;
  flex: 0 0 33.333333%;
  flex-grow: 1;
  .repoCard {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 20px 0;
    border-radius: 10px;
    border: 1px solid #171c26;
    background-color: #171c26;
    padding: 20px 0;
    border-radius: 10px;
    box-shadow: 0px 10px 20px -10px rgba(0, 0, 0, 0.75);
    color: #b3b8cd;
    a,
    h3 {
      color: white;
    }
    hr {
      margin-top: 10px;
      width: 75%;
      border: 0.5px solid white;
    }
    .repo-info-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .repo-info {
      text-align: left;
      padding: 15px;
      margin-top: 10px;
      background-color: #171c26;
      ul {
        list-style-type: none;
        margin-top: 10px;
        padding: 0;
        li {
          border: 1px solid #78259e;
          border-radius: 2px;
          display: inline-block;
          font-size: 12px;
          margin: 0 7px 7px 0;
          padding: 7px;
        }
      }
    }
  }

  .repoCardPopUp {
    position: fixed;
    top: 50%;
    left: 50%;
    background-color: whitesmoke;
    border: 2px solid black;
    padding: 32px;
    border-radius: 12px;
    transform: translate(-50%, -50%);
    flex: 0 0 100%;
    max-width: 80%;
    max-height: 80%;
    overflow-y: scroll;
    font-size: 14px;
    ul li,
    ol li,
    a {
      color: black;
    }
    img {
      width: 100%;
    }
    a img {
      width: 100px;
    }
  }
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    background-color: black;
    opacity: 0.5;
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

const RepoItem = ({ repo }) => {
  const [popupReadMe, setPopupReadMe] = useState(false)
  const [readMeContent, setReadMeContent] = useState('')
  const { login } = useParams()
  const redirect = useRef()

  useEffect(() => {
    const redirectStatus = redirect.current
    const handleClick = (e) => {
      e.stopPropagation()
    }
    redirectStatus.addEventListener('click', handleClick)
    return () => redirectStatus.removeEventListener('click', handleClick)
  }, [])

  const handleHidePopUp = () => {
    setPopupReadMe(false)
  }
  const handlePopUp = async () => {
    setPopupReadMe(true)
    await getDataApi(`/repos/${login}/${repo.name}/contents/README.md`)
      .then((response) => setReadMeContent(atob(response.data.content)))
      .catch((err) =>
        setReadMeContent('There is no README.md file in this repository'),
      )
  }

  return (
    <StyledRepoCardContainer className="repoCardContainer">
      <div className="repoCard" onClick={handlePopUp}>
        <h3>{repo.name}</h3>
        <hr />
        <div className="repo-info-container">
          <div className="repo-info">
            <ul>
              <li>Forks:{repo.forks}</li>
              <li>Open Issues:{repo.open_issues}</li>
              <li>Watchers:{repo.watchers}</li>
            </ul>
          </div>
          <StyledButton>
            <a ref={redirect} href={repo.html_url}>
              Go to this Repo on Github
            </a>
          </StyledButton>
        </div>
      </div>
      {popupReadMe && (
        <>
          <div className="overlay" onClick={handleHidePopUp} />
          <div className="repoCardPopUp" id="repoCardPopUp">
            <div className="repoCardContent">
              <h3>README content</h3>
              <br />
              <hr />
              <br />
              <ReactMarkdown>{readMeContent}</ReactMarkdown>
            </div>
          </div>
        </>
      )}
    </StyledRepoCardContainer>
  )
}

RepoItem.propTypes = {
  repo: PropTypes.object.isRequired,
}

export default RepoItem
