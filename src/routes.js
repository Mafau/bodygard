import { Router } from 'express'
import User from './schema/user'
import UserService from './services/user.service'
import { BadCredentials } from './errors'
import { authenticate } from './middlewares'

const router = Router()

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    const token = await UserService.createToken({ user: { _id: user._id } })
    res.status(201).json({
      token,
    })
  } catch (e) {
    next(e)
  }
})

router.get('/signin', async (req, res, next) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (!user) next(new BadCredentials())

    const check = await user.verifyPassword(password)
    if (!check) next(new BadCredentials())

    const token = await UserService.createToken({ user: { _id: user._id } })
    res.status(200).json({
      token,
    })
  } catch (e) {
    next(e)
  }
})

router.get('/profile', [authenticate], async (req, res) => {
  res.status(200).json(req.user)
})

export default router
