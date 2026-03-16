# Secure DevOps - Frontend (React)

CT5192 Assignment 2 — Frontend built with React + Vite.

## Stack
- React 18
- Vite 5
- React Router DOM
- Axios
- Vitest + Testing Library

## Local Setup

```bash
npm install
npm run dev
```

App runs at: http://localhost:3000

## Run Tests

```bash
npm test
npm run test:coverage
```

## Build

```bash
npm run build
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Login page |
| `/users` | Users list + create user |
| `/search` | Search with XSS demo |

## Security Tools Integrated
- **SonarCloud** — Static analysis on PRs and main branch
- **Snyk** — Dependency vulnerability scanning
- **ZAP** — Dynamic Application Security Testing (DAST)

## Intentional Vulnerabilities (for assignment)
1. `dangerouslySetInnerHTML` with user input in SearchPage — detected by SonarQube as security hotspot
2. Unvalidated redirect potential via axios — flagged by Snyk
