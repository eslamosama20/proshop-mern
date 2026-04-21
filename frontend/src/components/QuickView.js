import React, { useState } from 'react'
import { Modal, Button, Row, Col, Image, ListGroup, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const QuickView = ({ show, onHide, product }) => {
  const [qty, setQty] = useState(1)

  if (!product) return null

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton style={{ border: 'none', paddingBottom: 0 }}>
        <Modal.Title style={{ fontSize: '1.5rem', fontWeight: '700' }}>
          Quick View
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: '1.5rem' }}>
        <Row>
          <Col md={6}>
            <Image 
              src={product.image} 
              alt={product.name} 
              fluid 
              style={{ 
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
            />
          </Col>
          <Col md={6}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>
              {product.name}
            </h3>
            
            <div style={{ marginBottom: '1rem' }}>
              <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            </div>

            <h4 style={{ 
              color: '#4f46e5', 
              fontSize: '2rem', 
              fontWeight: '700',
              marginBottom: '1rem'
            }}>
              ${product.price}
            </h4>

            <p style={{ 
              color: '#6b7280', 
              lineHeight: '1.6',
              marginBottom: '1.5rem'
            }}>
              {product.description}
            </p>

            <ListGroup variant='flush' style={{ marginBottom: '1.5rem' }}>
              <ListGroup.Item style={{ padding: '0.75rem 0', border: 'none' }}>
                <Row>
                  <Col><strong>Brand:</strong></Col>
                  <Col>{product.brand}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item style={{ padding: '0.75rem 0', border: 'none' }}>
                <Row>
                  <Col><strong>Category:</strong></Col>
                  <Col>{product.category}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item style={{ padding: '0.75rem 0', border: 'none' }}>
                <Row>
                  <Col><strong>Status:</strong></Col>
                  <Col>
                    {product.countInStock > 0 ? (
                      <span style={{ color: '#10b981', fontWeight: '600' }}>
                        <i className='fas fa-check-circle'></i> In Stock
                      </span>
                    ) : (
                      <span style={{ color: '#ef4444', fontWeight: '600' }}>
                        <i className='fas fa-times-circle'></i> Out of Stock
                      </span>
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>

              {product.countInStock > 0 && (
                <ListGroup.Item style={{ padding: '0.75rem 0', border: 'none' }}>
                  <Row>
                    <Col><strong>Qty:</strong></Col>
                    <Col>
                      <Form.Control
                        as='select'
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                        style={{ borderRadius: '8px', width: 'auto' }}
                      >
                        {[...Array(Math.min(product.countInStock, 10)).keys()].map(
                          (x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          )
                        )}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
            </ListGroup>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link 
                to={`/product/${product._id}`}
                style={{ flex: 1 }}
              >
                <Button 
                  variant='outline-primary' 
                  className='w-100'
                  style={{ 
                    padding: '0.75rem',
                    fontWeight: '700',
                    borderRadius: '8px'
                  }}
                >
                  <i className='fas fa-info-circle' style={{ marginRight: '0.5rem' }}></i>
                  View Details
                </Button>
              </Link>
              <Button 
                variant='primary'
                disabled={product.countInStock === 0}
                className='w-100'
                style={{ 
                  flex: 1,
                  padding: '0.75rem',
                  fontWeight: '700',
                  borderRadius: '8px'
                }}
                onClick={() => {
                  window.location.href = `/cart/${product._id}?qty=${qty}`
                }}
              >
                <i className='fas fa-shopping-cart' style={{ marginRight: '0.5rem' }}></i>
                Add to Cart
              </Button>
            </div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  )
}

export default QuickView
