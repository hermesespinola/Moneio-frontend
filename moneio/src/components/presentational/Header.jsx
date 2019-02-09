import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/Header.css'

const Header = () => (
    <header
      id="header"
      className={`header${window.location.pathname === '/' ? '-home' : ''}`}
    >
      <h1><Link to="/">Where's benito</Link></h1>
      <nav id="nav">
        <ul>
          <li><Link to="/">Signup</Link></li>
          <li><Link to="#">Expore</Link></li>
          <li><Link to="/submit">Submit</Link></li>
        </ul>
      </nav>
    </header>
)

export default Header
