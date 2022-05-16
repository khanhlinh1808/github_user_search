import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import '../../style/UserItem.scss'

const UserItem = ({ user: { login, avatar_url } }) => {
  return (
    <div className="card-container">
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
    </div>
  )
}

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
}

export default UserItem
