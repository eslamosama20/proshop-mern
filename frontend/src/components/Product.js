import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Badge, Button } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({ product, onQuickView, onWishlistToggle, isInWishlist, onCompareToggle, isInCompare }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <Card
      className='my-3 rounded'
      style={{ height: '100%', position: 'relative', overflow: 'hidden' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Product Image */}
      <Link to={`/product/${product._id}`}>
        <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '14px 14px 0 0' }}>
          {!imageLoaded && (
            <div
              className='skeleton'
              style={{
                height: '250px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <i className='fas fa-image' style={{ fontSize: '3rem', color: '#d1d5db' }}></i>
            </div>
          )}
          <Card.Img
            src={product.image}
            variant='top'
            crossOrigin='anonymous'
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.target.onerror = null
              e.target.src = `https://placehold.co/400x300/e2e8f0/94a3b8?text=${encodeURIComponent(product.name.slice(0, 20))}`
              setImageLoaded(true)
            }}
            style={{
              transition: 'transform 0.45s ease',
              cursor: 'pointer',
              display: imageLoaded ? 'block' : 'none',
              transform: hovered ? 'scale(1.08)' : 'scale(1)',
              height: '250px',
              objectFit: 'cover',
            }}
          />

          {/* Dark overlay on hover */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(15,23,42,0.55) 0%, transparent 60%)',
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.35s ease',
            }}
          />

          {/* Stock badges */}
          {product.countInStock === 0 && (
            <Badge
              bg='danger'
              style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '0.78rem', padding: '0.45rem 0.8rem' }}
            >
              Out of Stock
            </Badge>
          )}
          {product.countInStock > 0 && product.countInStock <= 5 && (
            <Badge
              bg='warning'
              style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '0.78rem', padding: '0.45rem 0.8rem', color: '#78350f' }}
            >
              Only {product.countInStock} left
            </Badge>
          )}

          {/* Quick View Button */}
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              left: '50%',
              transform: 'translateX(-50%)',
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.3s ease, transform 0.3s ease',
              width: '88%',
              transform: hovered ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(10px)',
            }}
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
                fontWeight: 700,
                borderRadius: '8px',
                padding: '0.5rem',
                backdropFilter: 'blur(8px)',
                background: 'rgba(255,255,255,0.92)',
                border: 'none',
                boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                color: '#0f172a',
                fontSize: '0.85rem',
              }}
            >
              <i className='fas fa-eye' style={{ marginRight: '0.5rem', color: '#6c63ff' }}></i>
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
          top: '12px',
          left: '12px',
          zIndex: 10,
          padding: 0,
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          background: 'white',
          boxShadow: '0 2px 10px rgba(0,0,0,0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: 'none',
          transition: 'all 0.25s ease',
          transform: isInWishlist ? 'scale(1.15)' : 'scale(1)',
        }}
      >
        <i
          className={isInWishlist ? 'fas fa-heart' : 'far fa-heart'}
          style={{ color: isInWishlist ? '#ff4d6d' : '#94a3b8', fontSize: '1.05rem' }}
        ></i>
      </Button>

      {/* Compare Button */}
      <Button
        variant='link'
        size='sm'
        onClick={() => onCompareToggle && onCompareToggle(product)}
        style={{
          position: 'absolute',
          top: '58px',
          left: '12px',
          zIndex: 10,
          padding: 0,
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          background: 'white',
          boxShadow: '0 2px 10px rgba(0,0,0,0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: 'none',
          transition: 'all 0.25s ease',
        }}
      >
        <i
          className='fas fa-balance-scale'
          style={{ color: isInCompare ? '#00d9a6' : '#94a3b8', fontSize: '1rem' }}
        ></i>
      </Button>

      {/* Card Body */}
      <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1.2rem 1.4rem' }}>
        <div>
          <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
            <Card.Title as='div'>{product.name}</Card.Title>
          </Link>

          <Card.Text as='div' style={{ margin: '0.6rem 0' }}>
            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
          </Card.Text>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.8rem' }}>
          <Card.Text
            as='h3'
            style={{
              margin: 0,
              background: 'linear-gradient(135deg, #6c63ff 0%, #00d9a6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            ${product.price}
          </Card.Text>
          {product.brand && (
            <Badge
              bg='secondary'
              style={{
                fontSize: '0.75rem',
                background: 'linear-gradient(135deg, #334155 0%, #1e293b 100%)',
                borderRadius: '6px',
              }}
            >
              {product.brand}
            </Badge>
          )}
        </div>
      </Card.Body>
    </Card>
  )
}

export default Product
