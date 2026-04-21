import React from 'react'
import { Form } from 'react-bootstrap'

const SortOptions = ({ onSortChange, currentSort }) => {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '1rem',
      marginBottom: '1.5rem'
    }}>
      <label style={{ 
        fontWeight: '600', 
        color: '#374151',
        whiteSpace: 'nowrap'
      }}>
        <i className='fas fa-sort' style={{ marginRight: '0.5rem' }}></i>
        Sort by:
      </label>
      <Form.Control
        as='select'
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value)}
        style={{ 
          width: 'auto',
          minWidth: '200px',
          borderRadius: '8px',
          border: '2px solid #e5e7eb',
          fontWeight: '500'
        }}
      >
        <option value='latest'>Latest</option>
        <option value='price-asc'>Price: Low to High</option>
        <option value='price-desc'>Price: High to Low</option>
        <option value='rating-desc'>Top Rated</option>
        <option value='name-asc'>Name: A to Z</option>
        <option value='name-desc'>Name: Z to A</option>
      </Form.Control>
    </div>
  )
}

export default SortOptions
