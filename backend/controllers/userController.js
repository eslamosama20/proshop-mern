import asyncHandler from 'express-async-handler'
import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
import sendEmail from '../utils/sendEmail.js'

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    if (!user.isEmailVerified) {
      res.status(401)
      const err = new Error('EMAIL_NOT_VERIFIED')
      err.email = user.email
      throw err
    }    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password,
    isEmailVerified: false,
  })

  if (!user) {
    res.status(400)
    throw new Error('Invalid user data')
  }

  // Generate and send verification OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString()
  const salt = await bcrypt.genSalt(10)
  user.otpCode = await bcrypt.hash(otp, salt)
  user.otpExpires = new Date(Date.now() + 10 * 60 * 1000)
  await user.save()

  try {
    await sendEmail({
      to: user.email,
      subject: 'ProShop - Verify Your Email',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #333; text-align: center;">Welcome to ProShop!</h2>
          <p>Hello <strong>${user.name}</strong>,</p>
          <p>Thanks for signing up. Please verify your email address using the code below:</p>
          <div style="text-align: center; margin: 30px 0;">
            <span style="font-size: 36px; font-weight: bold; letter-spacing: 10px; color: #764ba2; background: #f3f0ff; padding: 15px 30px; border-radius: 8px;">${otp}</span>
          </div>
          <p style="color: #666; font-size: 14px;">This code expires in <strong>10 minutes</strong>.</p>
        </div>
      `,
    })
  } catch (err) {
    // Delete the user if email fails so they can try again
    await User.findByIdAndDelete(user._id)
    res.status(500)
    throw new Error('Failed to send verification email. Please try again.')
  }

  res.status(201).json({
    needsVerification: true,
    email: user.email,
    message: 'Registration successful. Please check your email for the verification code.',
  })
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  forgotPassword,
  verifyOtp,
  resetPassword,
  verifyEmail,
  resendVerification,
}

// @desc    Verify email after registration
// @route   POST /api/users/verifyemail
// @access  Public
async function verifyEmail(req, res) {
  const { email, otp } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  if (user.isEmailVerified) {
    res.status(400)
    throw new Error('Email is already verified')
  }

  if (!user.otpCode || !user.otpExpires) {
    res.status(400)
    throw new Error('No verification code found. Please request a new one.')
  }

  if (user.otpExpires < new Date()) {
    res.status(400)
    throw new Error('Verification code has expired. Please request a new one.')
  }

  const isMatch = await bcrypt.compare(otp, user.otpCode)
  if (!isMatch) {
    res.status(400)
    throw new Error('Incorrect code. Please try again.')
  }

  user.isEmailVerified = true
  user.otpCode = undefined
  user.otpExpires = undefined
  user.otpVerified = false
  await user.save()

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user._id),
  })
}

// @desc    Resend email verification OTP
// @route   POST /api/users/resendverification
// @access  Public
async function resendVerification(req, res) {
  const { email } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    res.status(404)
    throw new Error('No account found with this email')
  }

  if (user.isEmailVerified) {
    res.status(400)
    throw new Error('Email is already verified')
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString()
  const salt = await bcrypt.genSalt(10)
  user.otpCode = await bcrypt.hash(otp, salt)
  user.otpExpires = new Date(Date.now() + 10 * 60 * 1000)
  await user.save()

  try {
    await sendEmail({
      to: user.email,
      subject: 'ProShop - New Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #333; text-align: center;">Email Verification</h2>
          <p>Hello <strong>${user.name}</strong>,</p>
          <p>Here is your new verification code:</p>
          <div style="text-align: center; margin: 30px 0;">
            <span style="font-size: 36px; font-weight: bold; letter-spacing: 10px; color: #764ba2; background: #f3f0ff; padding: 15px 30px; border-radius: 8px;">${otp}</span>
          </div>
          <p style="color: #666; font-size: 14px;">This code expires in <strong>10 minutes</strong>.</p>
        </div>
      `,
    })
    res.json({ message: 'Verification code sent to your email' })
  } catch (err) {
    res.status(500)
    throw new Error('Failed to send email. Please try again.')
  }
}

// @desc    Send OTP to email for password reset
// @route   POST /api/users/forgotpassword
// @access  Public
async function forgotPassword(req, res) {
  const { email } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    res.status(404)
    throw new Error('No account found with this email address')
  }

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString()

  // Hash the OTP before storing
  const salt = await bcrypt.genSalt(10)
  user.otpCode = await bcrypt.hash(otp, salt)
  user.otpExpires = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
  user.otpVerified = false
  await user.save()

  try {
    await sendEmail({
      to: user.email,
      subject: 'ProShop - Password Reset OTP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #333; text-align: center;">Password Reset Request</h2>
          <p>Hello <strong>${user.name}</strong>,</p>
          <p>You requested to reset your password. Use the OTP code below:</p>
          <div style="text-align: center; margin: 30px 0;">
            <span style="font-size: 36px; font-weight: bold; letter-spacing: 10px; color: #764ba2; background: #f3f0ff; padding: 15px 30px; border-radius: 8px;">${otp}</span>
          </div>
          <p style="color: #666; font-size: 14px;">This code expires in <strong>10 minutes</strong>.</p>
          <p style="color: #666; font-size: 14px;">If you did not request this, please ignore this email.</p>
        </div>
      `,
    })
    res.json({ message: 'OTP sent to your email' })
  } catch (err) {
    user.otpCode = undefined
    user.otpExpires = undefined
    await user.save()
    res.status(500)
    throw new Error('Failed to send email. Please try again later.')
  }
}

// @desc    Verify OTP
// @route   POST /api/users/verifyotp
// @access  Public
async function verifyOtp(req, res) {
  const { email, otp } = req.body

  const user = await User.findOne({ email })

  if (!user || !user.otpCode || !user.otpExpires) {
    res.status(400)
    throw new Error('Invalid request. Please request a new OTP.')
  }

  if (user.otpExpires < new Date()) {
    res.status(400)
    throw new Error('OTP has expired. Please request a new one.')
  }

  const isMatch = await bcrypt.compare(otp, user.otpCode)
  if (!isMatch) {
    res.status(400)
    throw new Error('Incorrect OTP. Please try again.')
  }

  user.otpVerified = true
  await user.save()

  res.json({ message: 'OTP verified successfully' })
}

// @desc    Reset password after OTP verification
// @route   POST /api/users/resetpassword
// @access  Public
async function resetPassword(req, res) {
  const { email, otp, newPassword } = req.body

  const user = await User.findOne({ email })

  if (!user || !user.otpCode || !user.otpExpires) {
    res.status(400)
    throw new Error('Invalid request. Please start the process again.')
  }

  if (!user.otpVerified) {
    res.status(400)
    throw new Error('OTP not verified. Please verify your OTP first.')
  }

  if (user.otpExpires < new Date()) {
    res.status(400)
    throw new Error('OTP has expired. Please request a new one.')
  }

  const isMatch = await bcrypt.compare(otp, user.otpCode)
  if (!isMatch) {
    res.status(400)
    throw new Error('Invalid OTP.')
  }

  user.password = newPassword
  user.otpCode = undefined
  user.otpExpires = undefined
  user.otpVerified = false
  await user.save()

  res.json({ message: 'Password reset successfully. You can now log in.' })
}
