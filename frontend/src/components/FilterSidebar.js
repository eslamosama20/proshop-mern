import React, { useState, useEffect } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import axios from 'axios'

const FilterSidebar = ({ onFilterChange, currentFilters }) => {
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [filters, setFilters] = useState({
    category: currentFilters.category || '',
    brand: currentFilters.brand || '',
    minPrice: currentFilters.minPrice || '',
    maxPrice: currentFilters.maxPrice || '',
    rating: currentFilters.rating || '',
  })

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const { data: categoriesData } = await axios.get('/api/products/categories')
        const { data: brandsData } = await axios.get('/api/products/brands')
        setCategories(Array.isArray(categoriesData) ? categoriesData : [])
        setBrands(Array.isArray(brandsData) ? brandsData : [])
      } catch (error) {
        console.error('Error fetching filters:', error)
      }
    }
    fetchFilters()
  }, [])

  const handleFilterChange = (name, value) => {
    const newFilters = { ...filters, [name]: value }
    setFilters(newFilters)
  }

  const applyFilters = () => {
    onFilterChange(filters)
  }

  const clearFilters = () => {
    const clearedFilters = {
      category: '',
      brand: '',
      minPrice: '',
      maxPrice: '',
      rating: '',
    }
    setFilters(clearedFilters)
    onFilterChange(clearedFilters)
  }

  return (
    <Card style={{ 
      position: 'sticky', 
      top: '20px',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
      <Card.Body>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          <h4 style={{ margin: 0, fontSize: '1.3rem', fontWeight: '700' }}>
            <i className='fas fa-filter' style={{ marginRight: '0.5rem', color: '#4f46e5' }}></i>
            Filters
          </h4>
          <Button 
            variant='link' 
            size='sm' 
            onClick={clearFilters}
            style={{ 
              textDecoration: 'none',
              color: '#ef4444',
              fontWeight: '600'
            }}
          >
            Clear All
          </Button>
        </div>

        {/* Category Filter */}
        <Form.Group className='mb-4'>
          <Form.Label style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '0.8rem' }}>
            <i className='fas fa-th-large' style={{ marginRight: '0.5rem', color: '#4f46e5' }}></i>
            Category
          </Form.Label>
          <Form.Control
            as='select'
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            style={{ borderRadius: '8px' }}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        {/* Brand Filter */}
        <Form.Group className='mb-4'>
          <Form.Label style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '0.8rem' }}>
            <i className='fas fa-tag' style={{ marginRight: '0.5rem', color: '#10b981' }}></i>
            Brand
          </Form.Label>
          <Form.Control
            as='select'
            value={filters.brand}
            onChange={(e) => handleFilterChange('brand', e.target.value)}
            style={{ borderRadius: '8px' }}
          >
            <option value="">All Brands</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        {/* Price Range Filter */}
        <div className='mb-4'>
          <div style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '0.8rem' }}>
            <i className='fas fa-dollar-sign' style={{ marginRight: '0.5rem', color: '#f59e0b' }}></i>
            Price Range
          </div>
          <Form.Group className='mb-3'>
            <Form.Label style={{ fontSize: '0.9rem', fontWeight: '600' }}>Min Price</Form.Label>
            <Form.Control
              type='number'
              placeholder='$0'
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              style={{ borderRadius: '8px' }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label style={{ fontSize: '0.9rem', fontWeight: '600' }}>Max Price</Form.Label>
            <Form.Control
              type='number'
              placeholder='$10000'
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              style={{ borderRadius: '8px' }}
            />
          </Form.Group>
        </div>

        {/* Rating Filter */}
        <div className='mb-4'>
          <div style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '0.8rem' }}>
            <i className='fas fa-star' style={{ marginRight: '0.5rem', color: '#fbbf24' }}></i>
            Minimum Rating
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {[4, 3, 2, 1].map((rating) => (
              <Form.Check
                key={rating}
                type='radio'
                name='rating'
                id={`rating-${rating}`}
                label={
                  <span>
                    {[...Array(rating)].map((_, i) => (
                      <i key={i} className='fas fa-star' style={{ color: '#fbbf24', fontSize: '0.9rem' }}></i>
                    ))}
                    <span style={{ marginLeft: '0.5rem', color: '#6b7280' }}>& Up</span>
                  </span>
                }
                checked={filters.rating === rating.toString()}
                onChange={(e) => handleFilterChange('rating', e.target.checked ? rating.toString() : '')}
              />
            ))}
          </div>
        </div>

        <Button 
          variant='primary' 
          className='w-100 mt-3'
          onClick={applyFilters}
          style={{
            padding: '0.75rem',
            fontWeight: '700',
            borderRadius: '8px'
          }}
        >
          <i className='fas fa-search' style={{ marginRight: '0.5rem' }}></i>
          Apply Filters
        </Button>
      </Card.Body>
    </Card>
  )
}

export default FilterSidebar
