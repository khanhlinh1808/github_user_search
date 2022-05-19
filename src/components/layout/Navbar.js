import PropTypes from 'prop-types'
import { Link, NavLink } from 'react-router-dom'
import styled from 'styled-components'

const StyledNavbar = styled.nav`
  padding: 15px 40px;
  a,
  li {
    color: white;
    text-decoration: none;
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
  .menu {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
  .toggle {
    order: 1;
  }
  .item.button {
    order: 2;
  }
  .item {
    width: 100%;
    text-align: center;
    order: 3;
    display: none;
  }
  .item.active {
    display: block;
  }

  .menu.responsive li.toggle {
    right: 0;
    top: 0;
    cursor: pointer;
  }
  .menu.responsive {
    li {
      float: none;
      display: block;
      text-align: center;
      margin-bottom: 10px;
    }
  }
  @media (min-width: 600px) {
    .menu {
      justify-content: center;
      background-color: none;
    }
    .logo {
      flex: 1;
    }
    .toggle {
      flex: 1;
      text-align: right;
    }
    .toggle {
      order: 2;
    }
  }
  @media (min-width: 900px) {
    .item {
      display: block;
      width: auto;
    }
    .toggle {
      display: none;
    }
    .logo {
      order: 0;
    }
    .item {
      order: 1;
    }
    .menu li {
      padding: 15px 10px;
    }
  }
`

const handleResponsiveNavbar = () => {
  var x = document.getElementById('myMenu')
  if (x.className === 'menu') {
    x.className += ' responsive'
  } else {
    x.className = 'menu'
  }
}

const Navbar = ({ title }) => {
  return (
    <StyledNavbar>
      <ul className="menu" id="myMenu">
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
        <li className="toggle" onClick={handleResponsiveNavbar}>
          Menu
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
