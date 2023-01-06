const { createUser } = require('../../controllers/userController')

const router = require('express').Router()

router.route('/')
  .post(async (req, res) => {
    const { body } = req
    try {
      const user = await createUser(body)
      return res.send(user)
    } catch (error) {
      console.error(error)
      return res.status(500).send(error.message)
    }
  })

module.exports = router
