import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/Header.css'

const Header = () => {
  const [offline, setOffline] = useState(!navigator.onLine)
  const setOfflineStatus = () => setOffline(!navigator.onLine)
  useEffect(() => {
    window.addEventListener('online', setOfflineStatus)
    window.addEventListener('offline', setOfflineStatus)
    return () => {
      window.removeEventListener('online', setOfflineStatus)
      window.removeEventListener('offline', setOfflineStatus)
    }
  }, [])
  return (
    <header
      id="header"
      className={`header${window.location.pathname === '/' ? '-home' : ''}`}
    >
      <h1><Link to="/">Where's benito</Link></h1>
      {
        offline && <span className="badge-offline">Offline</span>
      }
      <nav id="nav">
        <ul>
          <li><Link to="/explore">Explore</Link></li>
          <li><Link to="/submit">Submit</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
