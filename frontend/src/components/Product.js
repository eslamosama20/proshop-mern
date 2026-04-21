import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Badge, Button } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({ product, onQuickView, onWishlistToggle, isInWishlist, onCompareToggle, isInCompare }) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <Card className='my-3 p-3 rounded' style={{ height: '100%', position: 'relative' }}>
      <Link to={`/product/${product._id}`}>
        <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '12px' }}>
          {!imageLoaded && (
            <div style={{ 
              height: '250px', 
              background: '#f3f4f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <i className='fas fa-image' style={{ fontSize: '3rem', color: '#d1d5db' }}></i>
            </div>
          )}
          <Card.Img 
            src={product.image} 
            variant='top'
            onLoad={() => setImageLoaded(true)}
            style={{ 
              transition: 'transform 0.3s ease',
              cursor: 'pointer',
              display: imageLoaded ? 'block' : 'none'
            }}
          />
          {product.countInStock === 0 && (
            <Badge 
              bg='danger' 
              style={{ 
                position: 'absolute', 
                top: '10px', 
                right: '10px',
                fontSize: '0.85rem',
                padding: '0.5rem 0.8rem'
              }}
            >
              Out of Stock
            </Badge>
          )}
          {product.countInStock > 0 && product.countInStock <= 5 && (
            <Badge 
              bg='warning' 
              style={{ 
                position: 'absolute', 
                top: '10px', 
                right: '10px',
                fontSize: '0.85rem',
                padding: '0.5rem 0.8rem'
              }}
            >
              Only {product.countInStock} left
            </Badge>
          )}
          
          {/* Quick View Button */}
          <div style={{
            position: 'absolute',
            bottom: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            opacity: 0,
            transition: 'opacity 0.3s ease',
            width: '90%'
          }}
          className='quick-view-btn'
          >
            <Button
              variant='light'
              size='sm'
              className='w-100'
              onClick={(e) => {
                e.preventDefault()
                onQuickView && onQuickView(product)
              }}
              style={{
                fontWeight: '600',
                borderRadius: '8px',
                padding: '0.5rem',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
            >
              <i className='fas fa-eye' style={{ marginRight: '0.5rem' }}></i>
              Quick View
            </Button>
          </div>
        </div>
      </Link>

      {/* Wishlist Button */}
      <Button
        variant='link'
        size='sm'
        onClick={() => onWishlistToggle && onWishlistToggle(product._id)}
        style={{
          position: 'absolute',
          top: '15px',
          left: '15px',
          zIndex: 10,
          padding: '0.5rem',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'white',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: 'none'
        }}
      >
        <i 
          className={isInWishlist ? 'fas fa-heart' : 'far fa-heart'} 
          style={{ 
            color: isInWishlist ? '#ef4444' : '#6b7280',
            fontSize: '1.2rem'
          }}
        ></i>
      </Button>

      {/* Compare Button */}
      <Button
        variant='link'
        size='sm'
        onClick={() => onCompareToggle && onCompareToggle(product)}
        style={{
          position: 'absolute',
          top: '15px',
          right: '15px',
          zIndex: 10,
          padding: '0.5rem',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'white',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: 'none'
        }}
      >
        <i 
          className='fas fa-balance-scale'
          style={{ 
            color: isInCompare ? '#10b981' : '#6b7280',
            fontSize: '1.2rem'
          }}
        ></i>
      </Button>

      <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
            <Card.Title as='div'>
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>

          <Card.Text as='div' style={{ margin: '0.8rem 0' }}>
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </Card.Text>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
          <Card.Text as='h3' style={{ margin: 0 }}>${product.price}</Card.Text>
          {product.brand && (
            <Badge bg='secondary' style={{ fontSize: '0.8rem' }}>
              {product.brand}
            </Badge>
          )}
        </div>
      </Card.Body>
      
      <style jsx>{`
        .card:hover .quick-view-btn {
          opacity: 1 !important;
        }
      `}</style>
    </Card>
  )
}

export default Product
