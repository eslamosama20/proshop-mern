import asyncHandler from 'express-async-handler'
import Newsletter from '../models/newsletterModel.js'

// @desc    Subscribe to newsletter
// @route   POST /api/newsletter
// @access  Public
const subscribe = asyncHandler(async (req, res) => {
  const { email } = req.body

  if (!email) {
    res.status(400)
    throw new Error('Please provide an email address')
  }

  const existing = await Newsletter.findOne({ email })

  if (existing) {
    res.status(400)
    throw new Error('This email is already subscribed')
  }

  await Newsletter.create({ email })

  res.status(201).json({ message: 'Successfully subscribed to newsletter' })
})

// @desc    Unsubscribe from newsletter
// @route   DELETE /api/newsletter
// @access  Public
const unsubscribe = asyncHandler(async (req, res) => {
  const { email } = req.body

  const subscriber = await Newsletter.findOne({ email })

  if (!subscriber) {
    res.status(404)
    throw new Error('Email not found')
  }

  await subscriber.remove()

  res.json({ message: 'Successfully unsubscribed' })
})

// @desc    Get all subscribers (admin)
// @route   GET /api/newsletter
// @access  Private/Admin
const getSubscribers = asyncHandler(async (req, res) => {
  const subscribers = await Newsletter.find({}).sort({ createdAt: -1 })
  res.json(subscribers)
})

export { subscribe, unsubscribe, getSubscribers }
