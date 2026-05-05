import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Table, Badge } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Loader from '../components/Loader'
import Message from '../components/Message'

const AdminDashboardScreen = ({ history }) => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
      return
    }

    const fetchStats = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
        const { data } = await axios.get('/api/orders/stats', config)
        setStats(data)
        setLoading(false)
      } catch (err) {
        setError(err.response?.data?.message || err.message)
        setLoading(false)
      }
    }

    fetchStats()
  }, [userInfo, history])

  if (loading) return <Loader />
  if (error) return <Message variant='danger'>{error}</Message>

  return (
    <>
      <h1 className='mb-4'>
        <i className='fas fa-tachometer-alt' style={{ marginRight: '0.5rem' }}></i>
        Dashboard
      </h1>

      {/* Stats Cards */}
      <Row className='mb-4'>
        <Col xs={6} md={4} lg={2} className='mb-3'>
          <Card className='text-center h-100 shadow-sm border-0' style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <Card.Body className='text-white'>
              <i className='fas fa-users fa-2x mb-2'></i>
              <h3 className='mb-0'>{stats.totalUsers}</h3>
              <small>Total Users</small>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} md={4} lg={2} className='mb-3'>
          <Card className='text-center h-100 shadow-sm border-0' style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            <Card.Body className='text-white'>
              <i className='fas fa-box fa-2x mb-2'></i>
              <h3 className='mb-0'>{stats.totalProducts}</h3>
              <small>Total Products</small>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} md={4} lg={2} className='mb-3'>
          <Card className='text-center h-100 shadow-sm border-0' style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
            <Card.Body className='text-white'>
              <i className='fas fa-clipboard-list fa-2x mb-2'></i>
              <h3 className='mb-0'>{stats.totalOrders}</h3>
              <small>Total Orders</small>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} md={4} lg={2} className='mb-3'>
          <Card className='text-center h-100 shadow-sm border-0' style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
            <Card.Body className='text-white'>
              <i className='fas fa-check-circle fa-2x mb-2'></i>
              <h3 className='mb-0'>{stats.paidOrders}</h3>
              <small>Paid Orders</small>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} md={4} lg={2} className='mb-3'>
          <Card className='text-center h-100 shadow-sm border-0' style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
            <Card.Body className='text-white'>
              <i className='fas fa-truck fa-2x mb-2'></i>
              <h3 className='mb-0'>{stats.deliveredOrders}</h3>
              <small>Delivered</small>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} md={4} lg={2} className='mb-3'>
          <Card className='text-center h-100 shadow-sm border-0' style={{ background: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' }}>
            <Card.Body className='text-white'>
              <i className='fas fa-dollar-sign fa-2x mb-2'></i>
              <h3 className='mb-0'>${stats.totalRevenue.toFixed(2)}</h3>
              <small>Total Revenue</small>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Quick Links */}
      <Row className='mb-4'>
        <Col md={4} className='mb-3'>
          <Card className='shadow-sm'>
            <Card.Body className='text-center'>
              <i className='fas fa-users fa-3x text-primary mb-3'></i>
              <h5>Manage Users</h5>
              <p className='text-muted small'>{stats.totalUsers} registered users</p>
              <LinkContainer to='/admin/userlist'>
                <Card.Link className='btn btn-outline-primary btn-sm'>
                  View Users
                </Card.Link>
              </LinkContainer>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className='mb-3'>
          <Card className='shadow-sm'>
            <Card.Body className='text-center'>
              <i className='fas fa-box fa-3x text-warning mb-3'></i>
              <h5>Manage Products</h5>
              <p className='text-muted small'>{stats.totalProducts} products in store</p>
              <LinkContainer to='/admin/productlist'>
                <Card.Link className='btn btn-outline-warning btn-sm'>
                  View Products
                </Card.Link>
              </LinkContainer>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className='mb-3'>
          <Card className='shadow-sm'>
            <Card.Body className='text-center'>
              <i className='fas fa-clipboard-list fa-3x text-success mb-3'></i>
              <h5>Manage Orders</h5>
              <p className='text-muted small'>{stats.totalOrders} orders total</p>
              <LinkContainer to='/admin/orderlist'>
                <Card.Link className='btn btn-outline-success btn-sm'>
                  View Orders
                </Card.Link>
              </LinkContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Orders */}
      <Card className='shadow-sm'>
        <Card.Header>
          <h5 className='mb-0'>
            <i className='fas fa-history' style={{ marginRight: '0.5rem' }}></i>
            Recent Orders
          </h5>
        </Card.Header>
        <Card.Body className='p-0'>
          {stats.recentOrders.length === 0 ? (
            <div className='p-3'>
              <Message>No orders yet.</Message>
            </div>
          ) : (
            <Table responsive striped hover className='mb-0 table-sm'>
              <thead className='table-dark'>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Paid</th>
                  <th>Delivered</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map((order) => (
                  <tr key={order._id}>
                    <td>
                      <LinkContainer to={`/order/${order._id}`} style={{ cursor: 'pointer' }}>
                        <span className='text-primary'>
                          {order._id.substring(0, 10)}...
                        </span>
                      </LinkContainer>
                    </td>
                    <td>{order.user ? order.user.name : 'Deleted User'}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>${order.totalPrice.toFixed(2)}</td>
                    <td>
                      {order.isPaid ? (
                        <Badge bg='success'>Paid</Badge>
                      ) : (
                        <Badge bg='danger'>Not Paid</Badge>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        <Badge bg='success'>Delivered</Badge>
                      ) : (
                        <Badge bg='warning' text='dark'>Pending</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </>
  )
}

export default AdminDashboardScreen
