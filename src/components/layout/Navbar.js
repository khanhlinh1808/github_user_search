import PropTypes from 'prop-types'
import { Link, NavLink } from 'react-router-dom'
import '../../style/Navbar.scss'

const Navbar = ({ title }) => {
  return (
    <nav>
      <ul className="menu">
        <li className="logo">
          <Link to="/">{title}</Link>
        </li>
        <li className="item">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'active-style' : 'none')}
            style={{ padding: '0 5px 10px 5px' }}
          >
            Home
          </NavLink>
        </li>
        <li className="item">
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? 'active-style' : 'none')}
            style={{ padding: '0 5px 10px 5px' }}
          >
            About
          </NavLink>
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
