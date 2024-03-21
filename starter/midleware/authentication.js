const User = require('../model/User')
const jwt = require('jsonwebtoken')


const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
  return res.send('authentication invalid')
  }
  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, 'jwtSecret')
    // attach the user to the job routes
    req.user = { userId: payload.userId, name: payload.name }
    next()
  } catch (error) {
    return res.send('Authentication invalid')
  }
}

module.exports = auth