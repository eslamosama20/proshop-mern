import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer style={{ background: '#1a1a2e', color: '#ccc', marginTop: '3rem' }}>
      <Container className='py-5'>
        <Row>
          {/* Brand & About */}
          <Col md={4} className='mb-4 mb-md-0'>
            <div style={{ marginBottom: '0.8rem' }}>
              <span
                style={{
                  fontSize: '1.6rem',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #6366f1 0%, #10b981 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                <i className='fas fa-shopping-bag' style={{ marginRight: '0.4rem', WebkitTextFillColor: '#6366f1' }}></i>
                ProShop
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.7', color: '#aaa' }}>
              Your one-stop destination for premium electronics. We bring you the latest
              gadgets, laptops, cameras, and accessories at unbeatable prices — with fast
              delivery and 24/7 support.
            </p>
            <div style={{ marginTop: '1rem' }}>
              <i className='fab fa-facebook' style={{ margin: '0 0.6rem 0 0', fontSize: '1.2rem', cursor: 'pointer', color: '#aaa' }}></i>
              <i className='fab fa-twitter' style={{ margin: '0 0.6rem 0 0', fontSize: '1.2rem', cursor: 'pointer', color: '#aaa' }}></i>
              <i className='fab fa-instagram' style={{ margin: '0 0.6rem 0 0', fontSize: '1.2rem', cursor: 'pointer', color: '#aaa' }}></i>
              <i className='fab fa-linkedin' style={{ margin: '0 0.6rem 0 0', fontSize: '1.2rem', cursor: 'pointer', color: '#aaa' }}></i>
            </div>
          </Col>

          {/* Quick Links */}
          <Col md={2} className='mb-4 mb-md-0'>
            <h6 style={{ color: '#fff', fontWeight: 'bold', marginBottom: '1rem', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px' }}>
              Quick Links
            </h6>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About Us' },
                { to: '/cart', label: 'Cart' },
                { to: '/wishlist', label: 'Wishlist' },
                { to: '/profile', label: 'My Account' },
              ].map((link) => (
                <li key={link.to} style={{ marginBottom: '0.5rem' }}>
                  <Link
                    to={link.to}
                    style={{ color: '#aaa', textDecoration: 'none', fontSize: '0.9rem' }}
                    onMouseEnter={(e) => (e.target.style.color = '#fff')}
                    onMouseLeave={(e) => (e.target.style.color = '#aaa')}
                  >
                    <i className='fas fa-chevron-right' style={{ marginRight: '0.4rem', fontSize: '0.7rem' }}></i>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          {/* Why ProShop */}
          <Col md={3} className='mb-4 mb-md-0'>
            <h6 style={{ color: '#fff', fontWeight: 'bold', marginBottom: '1rem', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px' }}>
              Why ProShop?
            </h6>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { icon: 'fas fa-shield-alt', text: 'Secure Payments' },
                { icon: 'fas fa-truck', text: 'Fast Delivery' },
                { icon: 'fas fa-undo', text: '30-Day Returns' },
                { icon: 'fas fa-headset', text: '24/7 Support' },
                { icon: 'fas fa-tags', text: 'Best Prices' },
              ].map((item) => (
                <li key={item.text} style={{ marginBottom: '0.5rem', fontSize: '0.9rem', color: '#aaa' }}>
                  <i className={item.icon} style={{ marginRight: '0.5rem', color: '#6366f1' }}></i>
                  {item.text}
                </li>
              ))}
            </ul>
          </Col>

          {/* Contact */}
          <Col md={3}>
            <h6 style={{ color: '#fff', fontWeight: 'bold', marginBottom: '1rem', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px' }}>
              Contact Us
            </h6>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '0.7rem', fontSize: '0.9rem', color: '#aaa' }}>
                <i className='fas fa-envelope' style={{ marginRight: '0.5rem', color: '#6366f1' }}></i>
                <a href='mailto:osamaeslam087@gmail.com' style={{ color: '#aaa', textDecoration: 'none' }}>
                  osamaeslam087@gmail.com
                </a>
              </li>
              <li style={{ marginBottom: '0.7rem', fontSize: '0.9rem', color: '#aaa' }}>
                <i className='fas fa-map-marker-alt' style={{ marginRight: '0.5rem', color: '#6366f1' }}></i>
                Cairo, Egypt
              </li>
              <li style={{ fontSize: '0.9rem', color: '#aaa' }}>
                <i className='fas fa-clock' style={{ marginRight: '0.5rem', color: '#6366f1' }}></i>
                Mon – Fri: 9am – 6pm
              </li>
            </ul>
          </Col>
        </Row>

        <hr style={{ borderColor: '#333', margin: '2rem 0 1.5rem' }} />

        <div className='text-center' style={{ color: '#666', fontSize: '0.85rem' }}>
          Copyright &copy; {new Date().getFullYear()}{' '}
          <span style={{ color: '#6366f1', fontWeight: 'bold' }}>ProShop</span>. All rights reserved.
          {' · '}
          <Link to='/about' style={{ color: '#888', textDecoration: 'none' }}>
            About Us
          </Link>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
