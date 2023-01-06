const mongoose = require('mongoose')

const { Schema } = mongoose

const addressSchema = new Schema({
  street: {
    type: String
  },
  number: {
    type: String
  },
  postcode: {
    type: String
  },
  city: {
    type: String
  },
  country: {
    type: String,
    default: 'France'
  }
}, { timestamps: true })

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  address: {
    type: addressSchema,
    default: {}
  },
  photo: {
    type: Schema.Types.ObjectId,
    ref: 'Image'
  },
  plats: [{
    type: Schema.Types.ObjectId,
    ref: 'Plat'
  }],
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true })

module.exports = mongoose.models.Restaurant || mongoose.model('Restaurant', restaurantSchema)
