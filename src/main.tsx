import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './legacy_proautodial/App.tsx'
import ErrorBoundary from './legacy_proautodial/components/ErrorBoundary.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
