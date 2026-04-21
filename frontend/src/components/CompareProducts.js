import React from 'react'
import { Table, Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const CompareProducts = ({ products, onRemoveProduct, onClearAll }) => {
  if (!products || products.length === 0) {
    return null
  }

  return (
    <div className='compare-products'>
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <h4>Compare Products ({products.length})</h4>
        <Button variant='outline-danger' size='sm' onClick={onClearAll}>
          Clear All
        </Button>
      </div>
      <div className='table-responsive'>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Product</th>
              {products.map((product) => (
                <th key={product._id} style={{ minWidth: '200px' }}>
                  <div className='text-center'>
                    <Image 
                      src={product.image} 
                      alt={product.name} 
                      fluid 
                      style={{ maxHeight: '150px', objectFit: 'contain' }}
                    />
                    <div className='mt-2'>
                      <Link to={`/product/${product._id}`}>{product.name}</Link>
                    </div>
                    <Button
                      variant='outline-danger'
                      size='sm'
                      className='mt-2'
                      onClick={() => onRemoveProduct(product._id)}
                    >
                      <i className='fas fa-times'></i>
                    </Button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Price</strong></td>
              {products.map((product) => (
                <td key={product._id} className='text-center'>
                  <h5>${product.price}</h5>
                </td>
              ))}
            </tr>
            <tr>
              <td><strong>Rating</strong></td>
              {products.map((product) => (
                <td key={product._id} className='text-center'>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </td>
              ))}
            </tr>
            <tr>
              <td><strong>Brand</strong></td>
              {products.map((product) => (
                <td key={product._id} className='text-center'>
                  {product.brand}
                </td>
              ))}
            </tr>
            <tr>
              <td><strong>Category</strong></td>
              {products.map((product) => (
                <td key={product._id} className='text-center'>
                  {product.category}
                </td>
              ))}
            </tr>
            <tr>
              <td><strong>Availability</strong></td>
              {products.map((product) => (
                <td key={product._id} className='text-center'>
                  {product.countInStock > 0 ? (
                    <span className='text-success'>
                      <i className='fas fa-check'></i> In Stock ({product.countInStock})
                    </span>
                  ) : (
                    <span className='text-danger'>
                      <i className='fas fa-times'></i> Out of Stock
                    </span>
                  )}
                </td>
              ))}
            </tr>
            <tr>
              <td><strong>Description</strong></td>
              {products.map((product) => (
                <td key={product._id} style={{ fontSize: '0.9rem' }}>
                  {product.description}
                </td>
              ))}
            </tr>
            <tr>
              <td><strong>Action</strong></td>
              {products.map((product) => (
                <td key={product._id} className='text-center'>
                  <Link to={`/product/${product._id}`}>
                    <Button variant='primary' size='sm'>
                      View Details
                    </Button>
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default CompareProducts
