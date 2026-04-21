import React, { useState, useEffect } from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const RecentlyViewed = () => {
  const [recentProducts, setRecentProducts] = useState([])

  useEffect(() => {
    const viewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]')
    setRecentProducts(viewed.slice(0, 4))
  }, [])

  if (recentProducts.length === 0) return null

  return (
    <div style={{ marginTop: '3rem', marginBottom: '2rem' }}>
      <h3 style={{ 
        fontSize: '1.8rem', 
        fontWeight: '700',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <i className='fas fa-history' style={{ color: '#4f46e5' }}></i>
        Recently Viewed
      </h3>
      
      <Row>
        {recentProducts.map((product) => (
          <Col key={product._id} sm={6} md={4} lg={3}>
            <Card 
              className='my-3 p-3 rounded'
              style={{ 
                height: '100%',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              <Link to={`/product/${product._id}`}>
                <Card.Img 
                  src={product.image} 
                  variant='top' 
                  style={{ 
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '8px'
                  }}
                />
              </Link>

              <Card.Body style={{ padding: '1rem 0' }}>
                <Link 
                  to={`/product/${product._id}`} 
                  style={{ textDecoration: 'none' }}
                >
                  <Card.Title 
                    as='div' 
                    style={{ 
                      fontSize: '1rem',
                      minHeight: '3rem',
                      marginBottom: '0.5rem'
                    }}
                  >
                    <strong>{product.name}</strong>
                  </Card.Title>
                </Link>

                <Card.Text as='div' style={{ marginBottom: '0.5rem' }}>
                  <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                </Card.Text>

                <Card.Text as='h3' style={{ 
                  color: '#4f46e5',
                  fontWeight: '700',
                  fontSize: '1.3rem'
                }}>
                  ${product.price}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default RecentlyViewed
