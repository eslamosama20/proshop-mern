import React from 'react'
import { Row, Col, Card, Button, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const FeaturedDeals = ({ products }) => {
  if (!products || products.length === 0) {
    return null
  }

  // Get top 3 products with highest ratings for deals
  const deals = products
    .filter((p) => p.rating >= 4.5 && p.countInStock > 0)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3)

  if (deals.length === 0) {
    return null
  }

  return (
    <div className='featured-deals my-5'>
      <div className='text-center mb-4'>
        <h2 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
          <i className='fas fa-fire' style={{ color: '#ff6b6b', marginRight: '0.5rem' }}></i>
          Hot Deals
        </h2>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>
          Limited time offers on top-rated products
        </p>
      </div>
      <Row>
        {deals.map((product, index) => {
          // Calculate fake discount (15-30%)
          const discount = Math.floor(Math.random() * 16) + 15
          const originalPrice = (product.price / (1 - discount / 100)).toFixed(2)
          
          return (
            <Col key={product._id} md={4} className='mb-4'>
              <Card 
                className='h-100 deal-card'
                style={{ 
                  borderRadius: '15px',
                  overflow: 'hidden',
                  border: '2px solid #ff6b6b',
                  position: 'relative',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
              >
                <Badge 
                  bg='danger' 
                  style={{ 
                    position: 'absolute',
                    top: '15px',
                    left: '15px',
                    zIndex: 2,
                    fontSize: '1rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '50px'
                  }}
                >
                  {discount}% OFF
                </Badge>
                <Link to={`/product/${product._id}`}>
                  <Card.Img 
                    src={product.image} 
                    variant='top'
                    style={{ 
                      height: '250px',
                      objectFit: 'contain',
                      padding: '1.5rem',
                      background: '#f8f9fa'
                    }}
                  />
                </Link>
                <Card.Body className='d-flex flex-column'>
                  <Link 
                    to={`/product/${product._id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <Card.Title as='h5' className='mb-2'>
                      {product.name}
                    </Card.Title>
                  </Link>
                  <Card.Text className='mb-2'>
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                  </Card.Text>
                  <div className='mt-auto'>
                    <div className='d-flex align-items-center mb-3'>
                      <h3 className='mb-0' style={{ color: '#ff6b6b', fontWeight: 'bold' }}>
                        ${product.price}
                      </h3>
                      <span 
                        style={{ 
                          textDecoration: 'line-through',
                          color: '#999',
                          marginLeft: '0.75rem',
                          fontSize: '1.1rem'
                        }}
                      >
                        ${originalPrice}
                      </span>
                    </div>
                    <div className='d-flex gap-2'>
                      <Link to={`/product/${product._id}`} className='flex-grow-1'>
                        <Button 
                          variant='primary' 
                          className='w-100'
                          style={{ borderRadius: '8px', fontWeight: 'bold' }}
                        >
                          <i className='fas fa-shopping-cart' style={{ marginRight: '0.5rem' }}></i>
                          Buy Now
                        </Button>
                      </Link>
                    </div>
                    <div 
                      className='mt-2 text-center' 
                      style={{ 
                        color: '#ff6b6b',
                        fontWeight: '600',
                        fontSize: '0.9rem'
                      }}
                    >
                      <i className='fas fa-clock' style={{ marginRight: '0.3rem' }}></i>
                      Hurry! Only {product.countInStock} left in stock
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          )
        })}
      </Row>
    </div>
  )
}

export default FeaturedDeals
