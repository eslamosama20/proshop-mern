import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Button, Badge } from 'react-bootstrap'
import axios from 'axios'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import FilterSidebar from '../components/FilterSidebar'
import SortOptions from '../components/SortOptions'
import QuickView from '../components/QuickView'
import RecentlyViewed from '../components/RecentlyViewed'
import FeaturedDeals from '../components/FeaturedDeals'
import Newsletter from '../components/Newsletter'
import Meta from '../components/Meta'
import { listProducts } from '../actions/productActions'

const HomeScreen = ({ match, history }) => {
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1

  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    minPrice: '',
    maxPrice: '',
    rating: '',
  })
  const [sortBy, setSortBy] = useState('latest')
  const [quickViewProduct, setQuickViewProduct] = useState(null)
  const [wishlist, setWishlist] = useState([])
  const [compareProducts, setCompareProducts] = useState([])

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber, filters))
  }, [dispatch, keyword, pageNumber, filters])

  useEffect(() => {
    if (userInfo) {
      fetchWishlist()
    
    // Load compare products from localStorage
    const storedCompare = localStorage.getItem('compareProducts')
    if (storedCompare) {
      setCompareProducts(JSON.parse(storedCompare))
    }
    }
  }, [userInfo])

  const fetchWishlist = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.get('/api/wishlist', config)
      setWishlist(data.products.map(p => p._id || p))
    } catch (error) {
      console.error('Error fetching wishlist:', error)
    }
  }

  const handleWishlistToggle = async (productId) => {
    if (!userInfo) {
      history.push('/login')
      return
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      if (wishlist.includes(productId)) {
        await axios.delete(`/api/wishlist/${productId}`, config)
        setWishlist(wishlist.filter(id => id !== productId))
      } else {
        await axios.post(`/api/wishlist/${productId}`, {}, config)
        setWishlist([...wishlist, productId])
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error)
    }
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  const handleSortChange = (newSort) => {
    setSortBy(newSort)
  }

  const handleCompareToggle = (product) => {
    let updatedCompare = [...compareProducts]
    
    // Check if product is already in compare
    const existingIndex = updatedCompare.findIndex(p => p._id === product._id)
    
    if (existingIndex !== -1) {
      // Remove from compare
      updatedCompare.splice(existingIndex, 1)
    } else {
      // Check if already have 4 products
      if (updatedCompare.length >= 4) {
        alert('You can compare maximum 4 products at a time')
        return
      }
      // Add to compare
      updatedCompare.push(product)
    }
    
    setCompareProducts(updatedCompare)
    localStorage.setItem('compareProducts', JSON.stringify(updatedCompare))
  }

  const isProductInCompare = (productId) => {
    return compareProducts.some(p => p._id === productId)
  }

  const getSortedProducts = () => {
    if (!products) return []
    
    let sorted = [...products]
    
    switch (sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price)
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price)
      case 'rating-desc':
        return sorted.sort((a, b) => b.rating - a.rating)
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name))
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name))
      default:
        return sorted
    }
  }

  const activeFiltersCount = Object.values(filters).filter(f => f !== '').length
  const sortedProducts = getSortedProducts()

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light mb-3'>
          <i className='fas fa-arrow-left' style={{ marginRight: '0.5rem' }}></i>
          Go Back
        </Link>
      )}
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 style={{ margin: 0 }}>
          <i className='fas fa-fire' style={{ marginRight: '0.5rem', color: '#f59e0b' }}></i>
          {keyword ? 'Search Results' : 'Latest Products'}
        </h1>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {compareProducts.length > 0 && (
            <Link to='/compare'>
              <Button variant='success'>
                <i className='fas fa-balance-scale' style={{ marginRight: '0.5rem' }}></i>
                Compare ({compareProducts.length})
              </Button>
            </Link>
          )}
          <Button 
            variant='outline-primary'
            onClick={() => setShowFilters(!showFilters)}
            className='d-lg-none'
          >
            <i className='fas fa-filter' style={{ marginRight: '0.5rem' }}></i>
            Filters
            {activeFiltersCount > 0 && (
              <Badge bg='danger' style={{ marginLeft: '0.5rem' }}>
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <Col lg={3} className={`mb-4 ${showFilters ? '' : 'd-none d-lg-block'}`}>
              <FilterSidebar onFilterChange={handleFilterChange} currentFilters={filters} />
            </Col>
            <Col lg={9}>
              <SortOptions onSortChange={handleSortChange} currentSort={sortBy} />
              
              {sortedProducts.length === 0 ? (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '3rem', 
                  background: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}>
                  <i className='fas fa-search' style={{ fontSize: '4rem', color: '#9ca3af', marginBottom: '1rem' }}></i>
                  <h3>No Products Found</h3>
                  <p style={{ color: '#6b7280' }}>Try adjusting your filters or search terms</p>
                </div>
              ) : (
                <>
                  <div style={{ marginBottom: '1rem', color: '#6b7280', fontSize: '0.95rem' }}>
                    Showing <strong>{sortedProducts.length}</strong> products
                  </div>
                  <Row>
                    {sortedProducts.map((product) => (
                      <Col key={product._id} sm={12} md={6} xl={4}>
                        <Product 
                          product={product}
                          onQuickView={setQuickViewProduct}
                          onCompareToggle={handleCompareToggle}
                          isInCompare={isProductInCompare(product._id)}
                          onWishlistToggle={handleWishlistToggle}
                          isInWishlist={wishlist.includes(product._id)}
                        />
                      </Col>
                    ))}
                  </Row>
                  <div style={{ marginTop: '2rem' }}>
                    <Paginate
                      pages={pages}
                      page={page}
                      keyword={keyword ? keyword : ''}
                    />
                  </div>
                </>
              )}
            </Col>
          </Row>

          {!keyword && <FeaturedDeals products={products} />}
          
          <RecentlyViewed />
          
          {!keyword && <Newsletter />}
        </>
      )}

      <QuickView 
        show={!!quickViewProduct}
        onHide={() => setQuickViewProduct(null)}
        product={quickViewProduct}
      />
    </>
  )
}

export default HomeScreen
