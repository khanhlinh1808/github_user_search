import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
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
    border: 1px solid black;
    padding: 20px 0;
    border-radius: 10px;
    a {
      color: black;
    }
    li {
      color: black;
      list-style-type: none;
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

const RepoItem = ({ repo }) => {
  const [popupReadMe, setPopupReadMe] = useState(false)
  const [readMeContent, setReadMeContent] = useState('')
  const { login } = useParams()

  const handleHidePopUp = () => {
    setPopupReadMe(false)
  }
  const handlePopUp = async () => {
    setPopupReadMe(true)
    await getDataApi(
      `https://api.github.com/repos/${login}/${repo.name}/contents/README.md`,
    )
      .then((response) => setReadMeContent(atob(response.data.content)))
      .catch((err) =>
        setReadMeContent('There is no README.md file in this repository'),
      )
  }

  return (
    <StyledRepoCardContainer className="repoCardContainer">
      <div className="repoCard" onClick={handlePopUp}>
        <h3>
          <a href={repo.html_url}>{repo.name}</a>
        </h3>
        <ul>
          <li>Forks:{repo.forks}</li>
          <li>Open Issues:{repo.open_issues}</li>
          <li>Watchers:{repo.watchers}</li>
        </ul>
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
