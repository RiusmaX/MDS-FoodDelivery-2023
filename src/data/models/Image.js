const mongoose = require('mongoose')

const { Schema } = mongoose

const imageSchema = new Schema({
  fileName: {
    type: String
  },
  originalName: {
    type: String
  },
  mimeType: {
    type: String
  },
  url: {
    type: String
  },
  path: {
    type: String
  },
  size: {
    type: Number
  }
}, { timestamps: true })

module.exports = mongoose.models.Image || mongoose.model('Image', imageSchema)
