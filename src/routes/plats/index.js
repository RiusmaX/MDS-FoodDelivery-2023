const {
  getPlats,
  createPlat,
  updatePlat,
  deletePlat,
  getPlatById
} = require('../../controllers/platController')
const { withAuth, adminOnly } = require('../../middlewares/auth')

const router = require('express').Router()

router.route('/')
  .get(async (req, res) => {
    try {
      const plats = await getPlats()
      return res.send(plats)
    } catch (error) {
      console.error(error)
      return res.status(500).send(error.message)
    }
  })
  .post(withAuth, adminOnly, async (req, res) => {
    try {
      const { body } = req
      const plat = await createPlat(body)
      return res.send(plat)
    } catch (error) {
      console.error(error)
      return res.status(500).send(error.message)
    }
  })

router.route('/:id')
  .get(async (req, res) => {
    try {
      const { id } = req.params
      const plat = await getPlatById(id)
      return res.send(plat)
    } catch (error) {
      console.error(error)
      return res.status(500).send(error.message)
    }
  })
  .patch(withAuth, adminOnly, async (req, res) => {
    try {
      const { body } = req
      const { id } = req.params
      const plat = await updatePlat(id, body)
      return res.send(plat)
    } catch (error) {
      console.error(error)
      return res.status(500).send(error.message)
    }
  })
  .delete(withAuth, adminOnly, async (req, res) => {
    try {
      const { id } = req.params
      await deletePlat(id)
      // TODO Supprimer plats
      return res.send(`Le plat avec l'ID : ${id} a été supprimé`)
    } catch (error) {
      console.error(error)
      return res.status(500).send(error.message)
    }
  })

module.exports = router
