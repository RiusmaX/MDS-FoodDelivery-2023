const mongoose = require('mongoose')
const imageSchema = require('./Image')

const { Schema } = mongoose

const platSchema = new Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  photo: {
    type: imageSchema,
    default: {}
  },
  price: {
    type: Number
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant'
  }
}, { timestamps: true })

module.exports = mongoose.models.Plat || mongoose.model('Plat', platSchema)
