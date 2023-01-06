const User = require('../data/models/User')
const jwt = require('jsonwebtoken')

const loginUser = async (credentials) => {
  // Je vérifie la présence des paramètres
  if (!credentials.email || !credentials.password) {
    throw new Error('Invalid credentials')
  }

  // On cherche l'utilisateur dans la base de données
  const user = await User.findOne({ email: credentials.email })

  if (!user) {
    throw new Error('Invalid credentials')
  }

  // On compare son mot de passe
  const isPasswordValid = await user.comparePassword(credentials.password)
  if (isPasswordValid) {
    const payload = {
      id: user.id,
      role: user.role
    }
    // On créé le token
    const token = await jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '7d' })
    const _user = user.toObject()
    delete _user.password
    return {
      user: _user,
      token
    }
  } else {
    throw new Error('Invalid credentials')
  }
}

module.exports = {
  loginUser
}
