import jwt from 'jsonwebtoken'

async function createToken(payload) {
  return await jwt.sign(payload, process.env.JWT_SECRET)
}

const UserService = {
  createToken,
}

export default UserService
