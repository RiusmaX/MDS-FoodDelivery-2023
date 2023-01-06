const Restaurant = require('../data/models/Restaurant')
const Plat = require('../data/models/Plat')

const { isObjectEmpty } = require('../tools/objects')

const getRestaurants = async () => {
  const restaurants = await Restaurant.find().populate('plats').populate('photo')
  return restaurants
}

const getRestaurantById = async (id) => {
  const restaurant = await Restaurant.findById(id).populate('plats').populate('photo')
  return restaurant
}

const createRestaurant = async (data) => {
  if (!data) {
    throw new Error('missing data')
  }
  const restaurant = new Restaurant(data)
  const restaurantSaved = await restaurant.save()
  return restaurantSaved
}

const updateRestaurant = async (id, data) => {
  if (!id) {
    throw new Error('missing id')
  }
  if (!data || isObjectEmpty(data)) {
    throw new Error('missing data')
  }
  if (data._id) {
    delete data._id
  }
  if (data.id) {
    delete data.id
  }
  const restaurantUpdated = await Restaurant.findByIdAndUpdate(id, data, { new: true })
  const restaurant = restaurantUpdated.toObject()
  return restaurant
}

const deleteRestaurant = async (id) => {
  if (!id) {
    throw new Error('missing id')
  }
  await Plat.deleteMany({ restaurant: id })
  await Restaurant.findByIdAndDelete(id)
}

module.exports = {
  getRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant
}
