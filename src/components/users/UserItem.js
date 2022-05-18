import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledCardContainer = styled.div`
  padding: 1rem;
  margin: 0.7rem 0;
  color: black;
  flex: 0 0 33.333333%;
  flex-grow: 1;
  .card {
    display: flex;
    align-items: center;
    flex-direction: column;
    border: 1px solid black;
    padding: 20px 0;
    border-radius: 10px;
  }
  .text-center {
    text-align: center;
  }
  .round-img {
    border-radius: 50%;
    margin-top: 5px;
    margin-bottom: 20px;
  }

  button {
    color: white;
    text-align: center;
    text-decoration: none;
    font-size: 12px;
    margin-top: 20px;
    cursor: pointer;
    background-color: black;
    padding: 10px 24px;
    border-radius: 8px;
  }
`

const UserItem = ({ user: { login, avatar_url } }) => {
  return (
    <StyledCardContainer className="card-container">
      <div className="card">
        <img
          src={avatar_url}
          alt="userAvatar"
          className="round-img"
          style={{ width: '100px' }}
        />
        <div className="card-login">{login}</div>
        <Link to={`user/${login}`}>
          <button>More...</button>
        </Link>
      </div>
    </StyledCardContainer>
  )
}

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
}

export default UserItem
