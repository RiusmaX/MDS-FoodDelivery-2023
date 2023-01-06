const jwt = require('jsonwebtoken')

const withAuth = async (req, res, next) => {
  if (req.headers.authorization) {
    try {
      const decoded = await jwt.verify(req.headers.authorization.split(' ')[1], process.env.TOKEN_SECRET)
      if (decoded && decoded.id) {
        req.userId = decoded.id
        next()
      } else {
        return res.status(401).send()
      }
    } catch (error) {
      return res.status(401).send(error)
    }
  } else {
    return res.status(401).send()
  }
}

const adminOnly = async (req, res, next) => {
  if (req.headers.authorization) {
    try {
      const decoded = await jwt.verify(req.headers.authorization.split(' ')[1], process.env.TOKEN_SECRET)
      if (decoded && decoded.role && decoded.role === 'admin') {
        req.userId = decoded.id
        req.isAdmin = true
        next()
      } else {
        return res.status(401).send()
      }
    } catch (error) {
      return res.status(401).send(error)
    }
  }
}

module.exports = {
  withAuth,
  adminOnly
}
