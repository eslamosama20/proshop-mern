import express from 'express'
const router = express.Router()
import {
  subscribe,
  unsubscribe,
  getSubscribers,
} from '../controllers/newsletterController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(subscribe).delete(unsubscribe).get(protect, admin, getSubscribers)

export default router
