import React, { useState, useEffect } from 'react'
import axios from 'axios'

function UsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newUser, setNewUser] = useState({ username: '', password: '', email: '' })
  const [createMsg, setCreateMsg] = useState(null)

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users')
      setUsers(response.data)
    } catch {
      setError('Failed to load users. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleCreate = async () => {
    try {
      await axios.post('http://localhost:5000/api/users', newUser)
      setCreateMsg({ type: 'success', text: '✅ User created successfully!' })
      setNewUser({ username: '', password: '', email: '' })
      fetchUsers()
    } catch {
      setCreateMsg({ type: 'error', text: '❌ Failed to create user.' })
    }
  }

  return (
    <div>
      <div className="card">
        <h2>👥 Users List</h2>
        {loading && <p style={{ color: '#94a3b8' }}>Loading...</p>}
        {error && <div className="alert alert-error">{error}</div>}
        {!loading && !error && (
          <table className="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="card">
        <h2>➕ Create User</h2>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            placeholder="Username"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
        </div>
        <button className="btn" onClick={handleCreate}>Create User</button>
        {createMsg && (
          <div className={`alert ${createMsg.type === 'success' ? 'alert-success' : 'alert-error'}`}>
            {createMsg.text}
          </div>
        )}
      </div>
    </div>
  )
}

export default UsersPage
