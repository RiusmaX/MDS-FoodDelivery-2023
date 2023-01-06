const mongoose = require('mongoose')
const imageSchema = require('./Image')

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
  title: {
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
    type: imageSchema,
    default: {}
  },
  plats: [{
    type: Schema.Types.ObjectId,
    ref: 'Plat'
  }]
}, { timestamps: true })

module.exports = mongoose.models.Restaurant || mongoose.model('Restaurant', restaurantSchema)
