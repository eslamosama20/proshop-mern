import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, InputGroup } from 'react-bootstrap'
import axios from 'axios'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'

const STEP_EMAIL = 1
const STEP_OTP = 2
const STEP_RESET = 3
const STEP_DONE = 4

const ForgotPasswordScreen = ({ history }) => {
  const [step, setStep] = useState(STEP_EMAIL)

  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

  // Step 1 — Send OTP
  const sendOtpHandler = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const { data } = await axios.post('/api/users/forgotpassword', { email })
      setMessage(data.message)
      setStep(STEP_OTP)
    } catch (err) {
      setError(err.response?.data?.message || err.message)
    }
    setLoading(false)
  }

  // Step 2 — Verify OTP
  const verifyOtpHandler = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const { data } = await axios.post('/api/users/verifyotp', { email, otp })
      setMessage(data.message)
      setStep(STEP_RESET)
    } catch (err) {
      setError(err.response?.data?.message || err.message)
    }
    setLoading(false)
  }

  // Step 3 — Reset Password
  const resetPasswordHandler = async (e) => {
    e.preventDefault()
    setError(null)
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    setLoading(true)
    try {
      const { data } = await axios.post('/api/users/resetpassword', {
        email,
        otp,
        newPassword,
      })
      setMessage(data.message)
      setStep(STEP_DONE)
    } catch (err) {
      setError(err.response?.data?.message || err.message)
    }
    setLoading(false)
  }

  const stepTitle = {
    [STEP_EMAIL]: 'Forgot Password',
    [STEP_OTP]: 'Enter OTP',
    [STEP_RESET]: 'Set New Password',
    [STEP_DONE]: 'All Done!',
  }

  return (
    <FormContainer>
      {/* Progress indicator */}
      <div className='d-flex justify-content-center align-items-center mb-4' style={{ gap: '8px' }}>
        {[STEP_EMAIL, STEP_OTP, STEP_RESET].map((s) => (
          <React.Fragment key={s}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: 14,
                background: step >= s ? '#764ba2' : '#e0e0e0',
                color: step >= s ? '#fff' : '#999',
                transition: 'background 0.3s',
              }}
            >
              {step > s ? <i className='fas fa-check'></i> : s}
            </div>
            {s < STEP_RESET && (
              <div
                style={{
                  flex: 1,
                  height: 3,
                  maxWidth: 60,
                  background: step > s ? '#764ba2' : '#e0e0e0',
                  transition: 'background 0.3s',
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      <h2 className='text-center mb-4'>{stepTitle[step]}</h2>

      {error && <Message variant='danger'>{error}</Message>}
      {message && step !== STEP_DONE && <Message variant='success'>{message}</Message>}
      {loading && <Loader />}

      {/* Step 1: Email */}
      {step === STEP_EMAIL && (
        <Form onSubmit={sendOtpHandler}>
          <Form.Group controlId='email' className='mb-3'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter your registered email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Form.Text className='text-muted'>
              We'll check if this email is registered and send an OTP.
            </Form.Text>
          </Form.Group>
          <Button type='submit' variant='primary' className='w-100' disabled={loading}>
            Send OTP
          </Button>
        </Form>
      )}

      {/* Step 2: OTP */}
      {step === STEP_OTP && (
        <Form onSubmit={verifyOtpHandler}>
          <p className='text-muted text-center mb-3'>
            An OTP was sent to <strong>{email}</strong>. Enter it below.
          </p>
          <Form.Group controlId='otp' className='mb-3'>
            <Form.Label>6-Digit OTP</Form.Label>
            <Form.Control
              type='text'
              placeholder='e.g. 123456'
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              maxLength={6}
              style={{ fontSize: '1.5rem', letterSpacing: '0.5rem', textAlign: 'center' }}
              required
            />
            <Form.Text className='text-muted'>Code expires in 10 minutes.</Form.Text>
          </Form.Group>
          <Button type='submit' variant='primary' className='w-100 mb-2' disabled={loading || otp.length !== 6}>
            Verify OTP
          </Button>
          <Button
            variant='link'
            className='w-100 text-muted'
            onClick={() => { setStep(STEP_EMAIL); setError(null); setMessage(null); setOtp('') }}
          >
            Resend OTP
          </Button>
        </Form>
      )}

      {/* Step 3: New Password */}
      {step === STEP_RESET && (
        <Form onSubmit={resetPasswordHandler}>
          <Form.Group controlId='newPassword' className='mb-3'>
            <Form.Label>New Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                placeholder='Enter new password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <Button
                variant='outline-secondary'
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                <i className={`fas fa-eye${showPassword ? '-slash' : ''}`}></i>
              </Button>
            </InputGroup>
          </Form.Group>
          <Form.Group controlId='confirmPassword' className='mb-3'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              placeholder='Confirm new password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button type='submit' variant='success' className='w-100' disabled={loading}>
            Reset Password
          </Button>
        </Form>
      )}

      {/* Step 4: Done */}
      {step === STEP_DONE && (
        <div className='text-center'>
          <div style={{ fontSize: '4rem', color: '#28a745' }}>
            <i className='fas fa-check-circle'></i>
          </div>
          <h5 className='mt-3'>{message}</h5>
          <Button
            variant='primary'
            className='mt-3 w-100'
            onClick={() => history.push('/login')}
          >
            Go to Login
          </Button>
        </div>
      )}

      <div className='text-center mt-4'>
        <Link to='/login'>
          <i className='fas fa-arrow-left' style={{ marginRight: '0.3rem' }}></i>
          Back to Login
        </Link>
      </div>
    </FormContainer>
  )
}

export default ForgotPasswordScreen
