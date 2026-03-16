import React, { useState } from 'react'
import axios from 'axios'

function SearchPage() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/search?q=${query}`)
      setResult(response.data)
      setError(null)
    } catch {
      setError('Search failed. Is the backend running?')
      setResult(null)
    }
  }

  return (
    <div>
      <div className="card">
        <h2>🔍 Search</h2>
        <div className="form-group">
          <label>Search Query</label>
          <input
            type="text"
            placeholder="Enter search term..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            data-testid="search-input"
          />
        </div>
        <button className="btn" onClick={handleSearch} data-testid="search-btn">
          Search
        </button>
        {error && <div className="alert alert-error">{error}</div>}
      </div>

      {result && (
        <div className="card">
          <h2>📋 Results</h2>
          {/* -------------------------------------------------------
            INTENTIONAL VULNERABILITY: XSS via dangerouslySetInnerHTML
            SonarQube detects this as a security hotspot.
            ZAP detects the reflected XSS on the backend /api/search endpoint.
            In production, NEVER use dangerouslySetInnerHTML with user input.
          ------------------------------------------------------- */}
          <div
            className="search-result"
            dangerouslySetInnerHTML={{ __html: result.message }}
            data-testid="search-result"
          />
          <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '0.5rem' }}>
            Raw query: {result.query}
          </p>
        </div>
      )}
    </div>
  )
}

export default SearchPage
