const router = require('express').Router()
const { dirname } = require('path')
const multer = require('multer')
const { sanatizeFilename } = require('../../tools/strings')

const { createImage } = require('../../controllers/imagesController')
const { adminOnly, withAuth } = require('../../middlewares/auth')

// Création du stockage sur le disque physique de la machine
const appDir = dirname(require.main.filename)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, appDir + '/../files/images/')
  },
  filename: (req, file, cb) => {
    const uniquePrefix = Date.now() + '_' + Math.round(Math.random() * 1E9)
    cb(null, uniquePrefix + '_' + sanatizeFilename(file.originalname))
  }
})

const authorizedTypes = [
  'png',
  'jpeg',
  'jpg',
  'gif',
  'webp',
  'webm'
]

// Création du middleware d'upload
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const type = file.mimetype.split('/')[1]
    if (authorizedTypes.includes(type)) {
      cb(null, true)
    } else {
      cb(null, false)
      return cb(new Error('File type must be ' + authorizedTypes))
    }
  }
})

// Route d'API
router.route('/')
  .post(withAuth, adminOnly, upload.single('file'), async (req, res) => {
    const { file } = req
    try {
      const savedImageObject = await createImage(file)
      return res.send(savedImageObject)
    } catch (error) {
      console.error(error)
      return res.status(500).send(error)
    }
  })

module.exports = router
