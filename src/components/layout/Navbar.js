import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import '../../style/Navbar.scss'

const Navbar = ({ title }) => {
  return (
    <nav>
      <ul className="menu">
        <li className="logo">
          <Link to="/">{title}</Link>
        </li>
        <li className="item">
          <Link to="/">Home</Link>
        </li>
        <li className="item">
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  )
}
Navbar.defaultProps = {
  title: 'Github User Searching App',
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Navbar
