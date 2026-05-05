import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { USER_LOGIN_SUCCESS } from '../constants/userConstants'

const VerifyEmailScreen = ({ location, history }) => {
  const params = new URLSearchParams(location.search)
  const emailFromQuery = params.get('email') || ''
  const redirectTo = params.get('redirect') || '/'

  const [email] = useState(emailFromQuery)
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [error, setError] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)
  const [cooldown, setCooldown] = useState(0)

  const dispatch = useDispatch()

  // Redirect if no email provided
  useEffect(() => {
    if (!emailFromQuery) {
      history.push('/register')
    }
  }, [emailFromQuery, history])

  // Cooldown timer for resend
  useEffect(() => {
    if (cooldown <= 0) return
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [cooldown])

  const verifyHandler = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccessMsg(null)
    setLoading(true)
    try {
      const { data } = await axios.post('/api/users/verifyemail', { email, otp })
      // Log the user in directly after verification
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
      localStorage.setItem('userInfo', JSON.stringify(data))
      history.push(redirectTo)
    } catch (err) {
      setError(err.response?.data?.message || err.message)
    }
    setLoading(false)
  }

  const resendHandler = async () => {
    setError(null)
    setSuccessMsg(null)
    setResendLoading(true)
    try {
      const { data } = await axios.post('/api/users/resendverification', { email })
      setSuccessMsg(data.message)
      setOtp('')
      setCooldown(60)
    } catch (err) {
      setError(err.response?.data?.message || err.message)
    }
    setResendLoading(false)
  }

  return (
    <FormContainer>
      {/* Icon */}
      <div className='text-center mb-3'>
        <div
          style={{
            width: 70,
            height: 70,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <i className='fas fa-envelope-open-text fa-2x text-white'></i>
        </div>
      </div>

      <h2 className='text-center mb-2'>Verify Your Email</h2>
      <p className='text-center text-muted mb-4' style={{ fontSize: '0.9rem' }}>
        We sent a 6-digit code to <strong>{email}</strong>.<br />
        Enter it below to activate your account.
      </p>

      {error && <Message variant='danger'>{error}</Message>}
      {successMsg && <Message variant='success'>{successMsg}</Message>}
      {(loading || resendLoading) && <Loader />}

      <Form onSubmit={verifyHandler}>
        <Form.Group controlId='otp' className='mb-3'>
          <Form.Control
            type='text'
            placeholder='_ _ _ _ _ _'
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
            maxLength={6}
            style={{
              fontSize: '2rem',
              letterSpacing: '0.8rem',
              textAlign: 'center',
              fontWeight: 'bold',
            }}
            required
            autoFocus
          />
          <Form.Text className='text-muted text-center d-block'>
            Code expires in 10 minutes.
          </Form.Text>
        </Form.Group>

        <Button
          type='submit'
          variant='primary'
          className='w-100 mb-3'
          disabled={loading || otp.length !== 6}
        >
          {loading ? 'Verifying...' : 'Verify Email'}
        </Button>
      </Form>

      <div className='text-center'>
        <span className='text-muted' style={{ fontSize: '0.9rem' }}>
          Didn't receive the code?{' '}
        </span>
        {cooldown > 0 ? (
          <span className='text-muted' style={{ fontSize: '0.9rem' }}>
            Resend in {cooldown}s
          </span>
        ) : (
          <Button
            variant='link'
            onClick={resendHandler}
            disabled={resendLoading}
            style={{ padding: 0, fontSize: '0.9rem' }}
          >
            Resend Code
          </Button>
        )}
      </div>

      <div className='text-center mt-4'>
        <Link to='/login'>
          <i className='fas fa-arrow-left' style={{ marginRight: '0.3rem' }}></i>
          Back to Login
        </Link>
      </div>
    </FormContainer>
  )
}

export default VerifyEmailScreen
