import React, { useState } from 'react'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import axios from 'axios'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState({ type: '', text: '' })
  const [loading, setLoading] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault()
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setMessage({ type: 'danger', text: 'Please enter a valid email address' })
      return
    }

    setLoading(true)
    
    try {
      await axios.post('/api/newsletter', { email })
      setMessage({ type: 'success', text: 'Thank you for subscribing! Check your email for updates.' })
      setEmail('')
    } catch (error) {
      const errMsg =
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Something went wrong'
      setMessage({
        type: errMsg.includes('already') ? 'warning' : 'danger',
        text: errMsg,
      })
    }

    setLoading(false)
  }

  return (
    <div className='newsletter-section' style={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '3rem 0',
      marginTop: '4rem'
    }}>
      <Container>
        <Row className='align-items-center'>
          <Col md={6} className='text-white mb-3 mb-md-0'>
            <h2 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
              <i className='fas fa-envelope' style={{ marginRight: '0.5rem' }}></i>
              Subscribe to Our Newsletter
            </h2>
            <p style={{ fontSize: '1.1rem', opacity: '0.9' }}>
              Get the latest updates on new products and upcoming sales
            </p>
          </Col>
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              <div className='d-flex'>
                <Form.Control
                  type='email'
                  placeholder='Enter your email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ 
                    borderRadius: '50px 0 0 50px',
                    padding: '0.75rem 1.5rem',
                    border: 'none'
                  }}
                  disabled={loading}
                />
                <Button
                  type='submit'
                  variant='dark'
                  style={{ 
                    borderRadius: '0 50px 50px 0',
                    padding: '0.75rem 2rem',
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap'
                  }}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className='spinner-border spinner-border-sm' style={{ marginRight: '0.5rem' }}></span>
                      Subscribing...
                    </>
                  ) : (
                    'Subscribe'
                  )}
                </Button>
              </div>
              {message.text && (
                <Alert variant={message.type} className='mt-3 mb-0'>
                  {message.text}
                </Alert>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Newsletter
