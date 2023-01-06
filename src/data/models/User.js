const mongoose = require('mongoose')
const { Schema } = mongoose
// Identique à const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  phone: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'customer'],
    default: 'customer'
  }
}, { timestamps: true })

// Remplace le mot de passe de l'utilisateur par un équivalent crypté avant l'enregistrement dans la BDD
userSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password') || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(user.password, salt)
      user.password = hash
      return next()
    } catch (error) {
      throw new Error(error)
    }
  }
})

userSchema.methods.comparePassword = async function (password) {
  const isPasswordValid = await bcrypt.compare(password, this.password)
  return isPasswordValid
}

module.exports = mongoose.models.User || mongoose.model('User', userSchema)
