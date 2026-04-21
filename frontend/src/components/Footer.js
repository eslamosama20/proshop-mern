import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-4'>
            <div style={{ marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold', background: 'linear-gradient(135deg, #6366f1 0%, #10b981 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                ProShop
              </span>
            </div>
            <div style={{ opacity: 0.8, fontSize: '0.95rem' }}>
              Your one-stop shop for all electronics
            </div>
            <div style={{ marginTop: '1rem', opacity: 0.7, fontSize: '0.9rem' }}>
              Copyright &copy; {new Date().getFullYear()} ProShop. All rights reserved.
            </div>
            <div style={{ marginTop: '1rem' }}>
              <i className='fab fa-facebook' style={{ margin: '0 0.5rem', fontSize: '1.2rem', cursor: 'pointer' }}></i>
              <i className='fab fa-twitter' style={{ margin: '0 0.5rem', fontSize: '1.2rem', cursor: 'pointer' }}></i>
              <i className='fab fa-instagram' style={{ margin: '0 0.5rem', fontSize: '1.2rem', cursor: 'pointer' }}></i>
              <i className='fab fa-linkedin' style={{ margin: '0 0.5rem', fontSize: '1.2rem', cursor: 'pointer' }}></i>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
