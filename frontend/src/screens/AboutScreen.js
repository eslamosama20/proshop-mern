import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import Meta from '../components/Meta'

const AboutScreen = () => {
  return (
    <>
      <Meta title='About Us | ProShop' />

      {/* Hero */}
      <div
        className='text-white text-center py-5 mb-5 rounded'
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <i className='fas fa-shopping-bag fa-3x mb-3'></i>
        <h1 className='display-5 fw-bold'>About ProShop</h1>
        <p className='lead mb-0'>Your trusted electronics destination since 2020</p>
      </div>

      {/* Mission */}
      <Row className='mb-5 align-items-center'>
        <Col md={6} className='mb-4 mb-md-0'>
          <h2>Our Mission</h2>
          <p className='text-muted' style={{ lineHeight: '1.8' }}>
            At ProShop, we believe everyone deserves access to top-quality electronics at fair
            prices. We carefully curate every product in our catalog — from smartphones and
            laptops to cameras and accessories — to ensure you always get the best value for
            your money.
          </p>
          <p className='text-muted' style={{ lineHeight: '1.8' }}>
            We're committed to providing a seamless, secure, and enjoyable shopping experience
            backed by fast shipping and responsive customer support.
          </p>
        </Col>
        <Col md={6}>
          <Row>
            {[
              { icon: 'fas fa-shield-alt', color: '#667eea', title: 'Secure Shopping', text: '100% secure payments and data protection' },
              { icon: 'fas fa-truck', color: '#10b981', title: 'Fast Delivery', text: 'Same-day dispatch on all in-stock items' },
              { icon: 'fas fa-headset', color: '#f59e0b', title: '24/7 Support', text: 'Our team is always here to help you' },
              { icon: 'fas fa-undo', color: '#ef4444', title: 'Easy Returns', text: '30-day hassle-free return policy' },
            ].map((item) => (
              <Col xs={6} className='mb-3' key={item.title}>
                <Card className='border-0 shadow-sm h-100 text-center p-3'>
                  <div
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      background: item.color + '20',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 10px',
                    }}
                  >
                    <i className={item.icon} style={{ color: item.color, fontSize: '1.3rem' }}></i>
                  </div>
                  <h6 className='mb-1'>{item.title}</h6>
                  <small className='text-muted'>{item.text}</small>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* Stats */}
      <div
        className='rounded p-5 mb-5 text-center'
        style={{ background: '#f8f9ff' }}
      >
        <h2 className='mb-4'>ProShop by the Numbers</h2>
        <Row>
          {[
            { value: '10,000+', label: 'Happy Customers', icon: 'fas fa-users' },
            { value: '500+', label: 'Products', icon: 'fas fa-box' },
            { value: '50+', label: 'Brands', icon: 'fas fa-tags' },
            { value: '4.8★', label: 'Average Rating', icon: 'fas fa-star' },
          ].map((stat) => (
            <Col xs={6} md={3} className='mb-3 mb-md-0' key={stat.label}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#764ba2' }}>
                {stat.value}
              </div>
              <div className='text-muted'>
                <i className={stat.icon} style={{ marginRight: '0.3rem' }}></i>
                {stat.label}
              </div>
            </Col>
          ))}
        </Row>
      </div>

      {/* Team */}
      <h2 className='text-center mb-4'>Meet the Team</h2>
      <Row className='justify-content-center mb-5'>
        {[
          { name: 'Eslam Osama', role: 'Founder & CEO', icon: 'fas fa-user-tie', color: '#667eea' },
          { name: 'Support Team', role: 'Customer Success', icon: 'fas fa-headset', color: '#10b981' },
          { name: 'Tech Team', role: 'Engineering', icon: 'fas fa-code', color: '#f59e0b' },
        ].map((member) => (
          <Col md={4} className='mb-3 text-center' key={member.name}>
            <Card className='border-0 shadow-sm p-4 h-100'>
              <div
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${member.color}, ${member.color}99)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 15px',
                }}
              >
                <i className={member.icon} style={{ color: '#fff', fontSize: '1.8rem' }}></i>
              </div>
              <h5 className='mb-1'>{member.name}</h5>
              <small className='text-muted'>{member.role}</small>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Contact */}
      <Card className='border-0 shadow-sm p-4 mb-4 text-center'>
        <h3 className='mb-3'>Get in Touch</h3>
        <p className='text-muted mb-3'>Have a question or feedback? We'd love to hear from you.</p>
        <Row className='justify-content-center'>
          <Col md={3} className='mb-2'>
            <i className='fas fa-envelope text-primary' style={{ marginRight: '0.4rem' }}></i>
            <a href='mailto:osamaeslam087@gmail.com' className='text-muted'>
              osamaeslam087@gmail.com
            </a>
          </Col>
          <Col md={3} className='mb-2'>
            <i className='fas fa-map-marker-alt text-danger' style={{ marginRight: '0.4rem' }}></i>
            <span className='text-muted'>Cairo, Egypt</span>
          </Col>
        </Row>
      </Card>
    </>
  )
}

export default AboutScreen
