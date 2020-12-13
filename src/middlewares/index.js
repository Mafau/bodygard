import jwt from 'jsonwebtoken'
import { Unauthorized } from '../errors'
import User from '../schema/user'

/**
 * Check JWT in header for private route
 * @param req Express request
 * @param res Express response
 * @param next
 * @throws Unauthorized
 * @returns {string}
 */
export async function authenticate(req, res, next) {
  const UnauthorizedError = new Unauthorized()
  if (!req.headers.authorization) {
    return next(UnauthorizedError)
  }

  const token = req.headers.authorization.replace('Bearer ', '')
  try {
    const {
      user: { _id },
    } = ({} = await jwt.verify(token, process.env.JWT_SECRET))

    const user = await User.findById(_id)
    if (!user) {
      return next(UnauthorizedError)
    }

    req.user = user
  } catch (e) {
    return next(UnauthorizedError)
  }

  return next()
}
