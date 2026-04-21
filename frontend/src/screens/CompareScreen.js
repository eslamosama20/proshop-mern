import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CompareProducts from '../components/CompareProducts'
import Message from '../components/Message'

const CompareScreen = () => {
  const [compareProducts, setCompareProducts] = useState([])

  useEffect(() => {
    const storedProducts = localStorage.getItem('compareProducts')
    if (storedProducts) {
      setCompareProducts(JSON.parse(storedProducts))
    }
  }, [])

  const removeProductHandler = (productId) => {
    const updatedProducts = compareProducts.filter((p) => p._id !== productId)
    setCompareProducts(updatedProducts)
    localStorage.setItem('compareProducts', JSON.stringify(updatedProducts))
  }

  const clearAllHandler = () => {
    setCompareProducts([])
    localStorage.removeItem('compareProducts')
  }

  return (
    <Container>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      <h1>Compare Products</h1>
      {compareProducts.length === 0 ? (
        <Message variant='info'>
          <div className='text-center py-4'>
            <i className='fas fa-balance-scale' style={{ fontSize: '3rem', marginBottom: '1rem' }}></i>
            <h4>No products to compare</h4>
            <p>Add products from the shop to compare their features</p>
            <Link to='/'>
              <Button variant='primary'>Start Shopping</Button>
            </Link>
          </div>
        </Message>
      ) : (
        <Row>
          <Col>
            <CompareProducts
              products={compareProducts}
              onRemoveProduct={removeProductHandler}
              onClearAll={clearAllHandler}
            />
          </Col>
        </Row>
      )}
    </Container>
  )
}

export default CompareScreen
