// /controllers/api/users.js
require('dotenv').config()
const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const crypto = require('crypto')

// const checkToken = (req, res) => {
//   console.log('req.user', req.user)
//   res.json(req.exp)
// }

const dataController = {
  async signUp (req, res, next) {
    try {
      const user = await User.create(req.body)
      console.log(req.body)
      // token will be a string
      const token = createJWT(user)
      // send back the token as a string
      // which we need to account for
      // in the client
      res.locals.data.user = user
      res.locals.data.token = token
      next()
    } catch (e) {
      console.log('error error error')
      res.status(400).json({ msg: e.message })
    }
  },
  async login (req, res, next) {
    try {
      const user = await User.findOne({ email: req.body.email })
      if (!user) throw new Error('User not found. Email was not valid')
      const password = crypto.createHmac('sha256', process.env.SECRET).update(req.body.password).digest('hex').split('').reverse().join('')
      const match = await bcrypt.compare(req.body.password, user.password)
      if (!match) throw new Error('Passwords do not match')
      res.locals.data.user = user
      res.locals.data.token = createJWT(user)
      next()
    } catch {
      res.status(400).json('Bad Credentials')
    }
  },
  async getUserBookmarks (req, res, next) {
    try {
      const user = await User.findOne({ email: res.locals.data.email }).populate('bookmarks').sort('bookmarks.createdAt').exec()
      const bookmarks = user.bookmarks
      res.locals.data.bookmarks = bookmarks
      next()
    } catch (err) {
      res.status(400).json({ msg: err.message })
    }
  }
}

const apiController = {
  auth (req, res) {
    res.json(res.locals.data.token)
  },
  user (req, res) {
    res.json(res.locals.data.user)
  },
  bookmarks (req, res) {
    res.json(res.locals.data.bookmarks)
  }
}

module.exports = {
//   checkToken,
  dataController,
  apiController
}

/* -- Helper Functions -- */

// this gets hoisted, meaning we can create it below the code and get called above it
function createJWT (user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  )
}
