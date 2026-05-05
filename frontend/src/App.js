import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import WishlistScreen from './screens/WishlistScreen'
import CompareScreen from './screens/CompareScreen'
import AdminDashboardScreen from './screens/AdminDashboardScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <PrivateRoute path='/order/:id' component={OrderScreen} />
          <PrivateRoute path='/shipping' component={ShippingScreen} />
          <PrivateRoute path='/payment' component={PaymentScreen} />
          <PrivateRoute path='/placeorder' component={PlaceOrderScreen} />
          <PrivateRoute path='/profile' component={ProfileScreen} />
          <PrivateRoute path='/wishlist' component={WishlistScreen} />
          <PrivateRoute path='/compare' component={CompareScreen} />
          <PrivateRoute path='/product/:id' component={ProductScreen} />
          <PrivateRoute path='/cart/:id?' component={CartScreen} />
          <PrivateRoute path='/admin/dashboard' component={AdminDashboardScreen} />
          <PrivateRoute path='/admin/userlist' component={UserListScreen} />
          <PrivateRoute path='/admin/user/:id/edit' component={UserEditScreen} />
          <PrivateRoute
            path='/admin/productlist'
            component={ProductListScreen}
            exact
          />
          <PrivateRoute
            path='/admin/productlist/:pageNumber'
            component={ProductListScreen}
            exact
          />
          <PrivateRoute path='/admin/product/:id/edit' component={ProductEditScreen} />
          <PrivateRoute path='/admin/orderlist' component={OrderListScreen} />
          <PrivateRoute path='/search/:keyword' component={HomeScreen} exact />
          <PrivateRoute path='/page/:pageNumber' component={HomeScreen} exact />
          <PrivateRoute
            path='/search/:keyword/page/:pageNumber'
            component={HomeScreen}
            exact
          />
          <PrivateRoute path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
