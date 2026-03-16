import React, { useState } from 'react'
import axios from 'axios'

function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password
      })
      setIsSuccess(true)
      setMessage(`✅ ${response.data.message} — Welcome, ${response.data.user}!`)
    } catch (error) {
      setIsSuccess(false)
      setMessage('❌ Invalid credentials. Please try again.')
    }
  }

  return (
    <div>
      <div className="card">
        <h2>🔐 Login</h2>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            data-testid="username-input"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            data-testid="password-input"
          />
        </div>
        <button className="btn" onClick={handleLogin} data-testid="login-btn">
          Login
        </button>
        {message && (
          <div className={`alert ${isSuccess ? 'alert-success' : 'alert-error'}`}>
            {message}
          </div>
        )}
      </div>

      <div className="card">
        <h2>ℹ️ Demo Credentials</h2>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
          Username: <strong style={{ color: '#38bdf8' }}>admin</strong> &nbsp;|&nbsp;
          Password: <strong style={{ color: '#38bdf8' }}>admin123</strong>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
