import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import UsersPage from './pages/UsersPage'
import SearchPage from './pages/SearchPage'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-brand">🔐 SecureApp</div>
          <div className="nav-links">
            <Link to="/">Login</Link>
            <Link to="/users">Users</Link>
            <Link to="/search">Search</Link>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
