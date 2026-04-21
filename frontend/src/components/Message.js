import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ variant, children }) => {
  const icons = {
    danger: 'fas fa-exclamation-circle',
    warning: 'fas fa-exclamation-triangle',
    success: 'fas fa-check-circle',
    info: 'fas fa-info-circle'
  }

  return (
    <Alert variant={variant} style={{ 
      borderRadius: '12px',
      padding: '1rem 1.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    }}>
      <i className={icons[variant] || icons.info} style={{ fontSize: '1.5rem' }}></i>
      <div>{children}</div>
    </Alert>
  )
}

Message.defaultProps = {
  variant: 'info',
}

export default Message
