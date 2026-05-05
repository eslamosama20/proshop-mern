import React from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>
              <i className='fas fa-shopping-bag' style={{ marginRight: '0.5rem' }}></i>
              ProShop
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Route render={({ history }) => <SearchBox history={history} />} />
            <Nav className='ml-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> Cart
                  {cartItems && cartItems.length > 0 && (
                    <Badge 
                      pill 
                      bg='success' 
                      style={{ 
                        marginLeft: '0.5rem',
                        fontSize: '0.7rem',
                        padding: '0.3rem 0.6rem'
                      }}
                    >
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/wishlist'>
                <Nav.Link>
                  <i className='fas fa-heart'></i> Wishlist
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/compare'>
                <Nav.Link>
                  <i className='fas fa-balance-scale'></i> Compare
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown 
                  title={
                    <span>
                      <i className='fas fa-user-circle' style={{ marginRight: '0.3rem' }}></i>
                      {userInfo.name}
                    </span>
                  } 
                  id='username'
                >
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>
                      <i className='fas fa-user' style={{ marginRight: '0.5rem' }}></i>
                      Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    <i className='fas fa-sign-out-alt' style={{ marginRight: '0.5rem' }}></i>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown 
                  title={
                    <span>
                      <i className='fas fa-user-shield' style={{ marginRight: '0.3rem' }}></i>
                      Admin
                    </span>
                  } 
                  id='adminmenu'
                >
                  <LinkContainer to='/admin/dashboard'>
                    <NavDropdown.Item>
                      <i className='fas fa-tachometer-alt' style={{ marginRight: '0.5rem' }}></i>
                      Dashboard
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>
                      <i className='fas fa-users' style={{ marginRight: '0.5rem' }}></i>
                      Users
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>
                      <i className='fas fa-box' style={{ marginRight: '0.5rem' }}></i>
                      Products
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>
                      <i className='fas fa-clipboard-list' style={{ marginRight: '0.5rem' }}></i>
                      Orders
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
