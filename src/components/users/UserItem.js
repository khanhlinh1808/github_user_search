import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledCardContainer = styled.div`
  padding: 1rem;
  margin: 20px 0;
  color: black;
  flex: 0 0 33.333333%;
  flex-grow: 1;
  .card {
    display: flex;
    align-items: center;
    flex-direction: column;
    border: 1px solid #171c26;
    padding: 20px 0;
    border-radius: 10px;
    border-radius: 5px;
    box-shadow: 0px 10px 20px -10px rgba(0, 0, 0, 0.75);
    color: #b3b8cd;
    .card-login,
    .card-location {
      color: white;
      font-size: 16px;
    }
  }
  .text-center {
    text-align: center;
  }
  .round-img {
    border-radius: 50%;
    margin-top: 5px;
    margin-bottom: 10px;
    border: 4px solid #78259e;
  }

  .card-button {
    background-color: #78259e;
    border: 1px solid #78259e;
    border-radius: 3px;
    color: white;
    font-family: Montserrat, sans-serif;
    font-weight: 500;
    padding: 10px 25px;
    margin: 15px 10px;
    cursor: pointer;
  }
`

const UserItem = ({ user: { login, avatar_url, type } }) => {
  console.log(login, avatar_url, type)
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
          <button className="card-button">More</button>
        </Link>
      </div>
    </StyledCardContainer>
  )
}

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
}

export default UserItem
