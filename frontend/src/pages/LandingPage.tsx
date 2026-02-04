import React from 'react'

export const LandingPage: React.FC = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#000000',
      color: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Genie AI</h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>
          Next-Generation AI Development Platform
        </p>
        <button style={{
          background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '8px',
          fontSize: '1rem',
          fontWeight: 'bold',
          marginTop: '2rem',
          cursor: 'pointer'
        }}>
          Launch Terminal
        </button>
      </div>
    </div>
  )
}