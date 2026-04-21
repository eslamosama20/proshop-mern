import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Rating from '../components/Rating'

const WishlistScreen = ({ history }) => {
  const [wishlist, setWishlist] = useState(null)
  const [loading, setLoading] = useState(true)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      fetchWishlist()
    }
  }, [userInfo, history])

  const fetchWishlist = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.get('/api/wishlist', config)
      setWishlist(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching wishlist:', error)
      setLoading(false)
    }
  }

  const removeFromWishlistHandler = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      await axios.delete(`/api/wishlist/${id}`, config)
      fetchWishlist()
    } catch (error) {
      console.error('Error removing from wishlist:', error)
    }
  }

  return (
    <div style={{ marginTop: '2rem' }}>
      <h1 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <i className='fas fa-heart' style={{ color: '#ef4444' }}></i>
        My Wishlist
      </h1>
      
      {loading ? (
        <Loader />
      ) : !wishlist || wishlist.products.length === 0 ? (
        <Card style={{ 
          padding: '3rem', 
          textAlign: 'center',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <i className='far fa-heart' style={{ fontSize: '5rem', color: '#d1d5db', marginBottom: '1rem' }}></i>
          <h3>Your Wishlist is Empty</h3>
          <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
            Save your favorite products here
          </p>
          <Link to='/'>
            <Button variant='primary'>
              <i className='fas fa-shopping-bag' style={{ marginRight: '0.5rem' }}></i>
              Start Shopping
            </Button>
          </Link>
        </Card>
      ) : (
        <Row>
          {wishlist.products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Card className='my-3 p-3 rounded' style={{ height: '100%' }}>
                <Link to={`/product/${product._id}`}>
                  <Card.Img 
                    src={product.image} 
                    variant='top'
                    style={{ 
                      height: '250px',
                      objectFit: 'cover',
                      borderRadius: '12px'
                    }}
                  />
                </Link>

                <Card.Body>
                  <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
                    <Card.Title as='div' style={{ minHeight: '3rem' }}>
                      <strong>{product.name}</strong>
                    </Card.Title>
                  </Link>

                  <Card.Text as='div' style={{ margin: '0.8rem 0' }}>
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                  </Card.Text>

                  <Card.Text as='h3' style={{ color: '#4f46e5', fontWeight: '700' }}>
                    ${product.price}
                  </Card.Text>

                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                    <Link to={`/product/${product._id}`} style={{ flex: 1 }}>
                      <Button variant='primary' className='w-100'>
                        <i className='fas fa-eye' style={{ marginRight: '0.5rem' }}></i>
                        View
                      </Button>
                    </Link>
                    <Button
                      variant='outline-danger'
                      onClick={() => removeFromWishlistHandler(product._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  )
}

export default WishlistScreen
