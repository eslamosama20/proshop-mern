import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import User from './models/userModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const migrateEmailVerified = async () => {
  try {
    const result = await User.updateMany(
      { isEmailVerified: { $ne: true } },
      { $set: { isEmailVerified: true } }
    )
    const modified = result.nModified !== undefined ? result.nModified : result.modifiedCount
    console.log(
      `Migration done: ${modified} existing users marked as email verified`.green.bold
    )
    process.exit()
  } catch (error) {
    console.error(`Error: ${error.message}`.red.bold)
    process.exit(1)
  }
}

migrateEmailVerified()
