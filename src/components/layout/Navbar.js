import PropTypes from 'prop-types'
import { Link, NavLink } from 'react-router-dom'
import styled from 'styled-components'

const StyledNavbar = styled.nav`
  padding: 15px 40px;
  a {
    color: white;
    text-decoration: none;
  }
  li {
    color: white;
  }
  .menu {
    list-style-type: none;
  }
  .logo {
    font-size: 16px;
    padding: 10px;
  }
  .item {
    padding: 10px;
  }
  .item.button {
    padding: 9px 5px;
  }
  .item:not(.button) a:hover,
  .item a:hover::after {
    color: #ccc;
  }
  .active-style {
    border-bottom: 3px solid #413853;
  }
  /* Mobile menu */
  .menu {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
  .menu li a {
    display: block;
  }

  .toggle {
    order: 1;
    font-size: 20px;
  }
  .item.button {
    order: 2;
  }
  .item {
    order: 3;
    width: 100%;
    text-align: center;
    display: none;
  }
  .active .item {
    display: block;
  }
  .button.secondary {
    border-bottom: 1px #444 solid;
  }
  @media all and (min-width: 700px) {
    .menu {
      justify-content: center;
    }
    .logo {
      flex: 1;
    }
    .item.button {
      width: auto;
      order: 1;
      display: block;
    }
    .toggle {
      flex: 1;
      text-align: right;
      order: 2;
    }
    .menu li.button a {
      padding: 10px 15px;
      margin: 5px 0;
    }
    .button a {
      background: #0080ff;
      border: 1px royalblue solid;
    }
    .button.secondary {
      border: 0;
    }
    .button.secondary a {
      background: transparent;
      border: 1px #0080ff solid;
    }
    .button a:hover {
      text-decoration: none;
    }
    .button:not(.secondary) a:hover {
      background: royalblue;
      border-color: darkblue;
    }
  }
  @media all and (min-width: 960px) {
    .menu {
      align-items: flex-start;
      flex-wrap: nowrap;
      background: none;
    }
    .logo {
      order: 0;
    }
    .item {
      order: 1;
      position: relative;
      display: block;
      width: auto;
    }
    .button {
      order: 2;
    }
    .submenu-active .submenu {
      display: block;
      position: absolute;
      left: 0;
      top: 68px;
      background: #111;
    }
    .toggle {
      display: none;
    }
    .submenu-active {
      border-radius: 0;
    }
  }
`
const Navbar = ({ title }) => {
  return (
    <StyledNavbar>
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
    </StyledNavbar>
  )
}
Navbar.defaultProps = {
  title: 'Github User Searching App',
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Navbar
