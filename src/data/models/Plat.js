const mongoose = require('mongoose')

const { Schema } = mongoose

const platSchema = new Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  photo: {
    type: Schema.Types.ObjectId,
    ref: 'Image'
  },
  price: {
    type: Number
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant'
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true })

module.exports = mongoose.models.Plat || mongoose.model('Plat', platSchema)
