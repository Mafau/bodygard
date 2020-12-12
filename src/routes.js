import { Router } from 'express'
import User from './schema/user'
import UserService from './services/user.service'

const router = Router()

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    const token = await UserService.createToken({ user: { _id: user._id } })
    res.json({
      token,
    })
  } catch (e) {
    next(e)
  }
})

router.get('/signin', (req, res) => {
  res.send({
    name: 'maxime',
  })
})

export default router
