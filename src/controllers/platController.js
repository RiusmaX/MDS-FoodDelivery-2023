const Plat = require('../data/models/Plat')
const Restaurant = require('../data/models/Restaurant')
const { isObjectEmpty } = require('../tools/objects')

const getPlats = async () => {
  const plats = await Plat.find()
  return plats
}

const getPlatById = async (id) => {
  const plat = await Plat.findById(id)
  return plat
}

const createPlat = async (data) => {
  if (!data) {
    throw new Error('missing data')
  }
  const plat = new Plat(data)
  const platSaved = await plat.save()
  if (platSaved.restaurant) {
    await Restaurant.findByIdAndUpdate(platSaved.restaurant,
      { $push: { plats: platSaved._id } },
      { new: true, useFindAndModify: false })
  }
  return platSaved
}

const updatePlat = async (id, data) => {
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
  const platUpdated = await Plat.findByIdAndUpdate(id, data, { new: true })
  const plat = platUpdated.toObject()
  return plat
}

const deletePlat = async (id) => {
  if (!id) {
    throw new Error('missing id')
  }
  await Plat.findByIdAndDelete(id)
}

module.exports = {
  getPlats,
  getPlatById,
  createPlat,
  updatePlat,
  deletePlat
}
