import asyncHandler from 'express-async-handler'
import Wishlist from '../models/wishlistModel.js'

// @desc    Get user wishlist
// @route   GET /api/wishlist
// @access  Private
const getWishlist = asyncHandler(async (req, res) => {
  let wishlist = await Wishlist.findOne({ user: req.user._id }).populate('products')

  if (!wishlist) {
    wishlist = await Wishlist.create({ user: req.user._id, products: [] })
  }

  res.json(wishlist)
})

// @desc    Add product to wishlist
// @route   POST /api/wishlist/:id
// @access  Private
const addToWishlist = asyncHandler(async (req, res) => {
  const productId = req.params.id

  let wishlist = await Wishlist.findOne({ user: req.user._id })

  if (!wishlist) {
    wishlist = await Wishlist.create({ user: req.user._id, products: [productId] })
  } else {
    if (wishlist.products.includes(productId)) {
      res.status(400)
      throw new Error('Product already in wishlist')
    }
    wishlist.products.push(productId)
    await wishlist.save()
  }

  res.status(201).json({ message: 'Product added to wishlist' })
})

// @desc    Remove product from wishlist
// @route   DELETE /api/wishlist/:id
// @access  Private
const removeFromWishlist = asyncHandler(async (req, res) => {
  const productId = req.params.id

  const wishlist = await Wishlist.findOne({ user: req.user._id })

  if (wishlist) {
    wishlist.products = wishlist.products.filter(
      (product) => product.toString() !== productId
    )
    await wishlist.save()
    res.json({ message: 'Product removed from wishlist' })
  } else {
    res.status(404)
    throw new Error('Wishlist not found')
  }
})

export { getWishlist, addToWishlist, removeFromWishlist }
