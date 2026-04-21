import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '300px',
      flexDirection: 'column',
      gap: '1rem'
    }}>
      <Spinner
        animation='border'
        role='status'
        style={{
          width: '80px',
          height: '80px',
          borderWidth: '4px',
          color: '#4f46e5'
        }}
      >
        <span className='sr-only'>Loading...</span>
      </Spinner>
      <p style={{ 
        color: '#6b7280', 
        fontSize: '1.1rem',
        fontWeight: '500',
        marginTop: '1rem'
      }}>
        Loading...
      </p>
    </div>
  )
}

export default Loader
