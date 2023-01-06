const {
  getRestaurants,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getRestaurantById
} = require('../../controllers/restaurantController')
const { withAuth, adminOnly } = require('../../middlewares/auth')

const router = require('express').Router()

router.route('/')
  .get(async (req, res) => {
    try {
      const restaurants = await getRestaurants()
      return res.send(restaurants)
    } catch (error) {
      console.error(error)
      return res.status(500).send(error.message)
    }
  })
  .post(withAuth, adminOnly, async (req, res) => {
    try {
      const { body } = req
      const restaurant = await createRestaurant(body)
      return res.send(restaurant)
    } catch (error) {
      console.error(error)
      return res.status(500).send(error.message)
    }
  })

router.route('/:id')
  .get(async (req, res) => {
    try {
      const { id } = req.params
      const restaurant = await getRestaurantById(id)
      return res.send(restaurant)
    } catch (error) {
      console.error(error)
      return res.status(500).send(error.message)
    }
  })
  .patch(withAuth, adminOnly, async (req, res) => {
    try {
      const { body } = req
      const { id } = req.params
      const restaurant = await updateRestaurant(id, body)
      return res.send(restaurant)
    } catch (error) {
      console.error(error)
      return res.status(500).send(error.message)
    }
  })
  .delete(withAuth, adminOnly, async (req, res) => {
    try {
      const { id } = req.params
      await deleteRestaurant(id)
      // TODO Supprimer plats
      return res.send(`Le restaurant avec l'ID : ${id} a été supprimé`)
    } catch (error) {
      console.error(error)
      return res.status(500).send(error.message)
    }
  })

module.exports = router
