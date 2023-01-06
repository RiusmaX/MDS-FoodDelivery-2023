const Image = require('../data/models/Image')

const createImage = async (file) => {
  if (!file) {
    throw new Error('Missing file')
  }

  const newImage = new Image({
    fileName: file.filename,
    originalName: file.originalname,
    mimeType: file.mimetype,
    path: file.path,
    size: file.size
  })

  const savedImage = await newImage.save()

  const savedImageObject = savedImage.toObject()
  return savedImageObject
}

module.exports = {
  createImage
}
