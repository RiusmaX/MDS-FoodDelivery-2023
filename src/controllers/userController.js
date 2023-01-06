const User = require('../data/models/User')
const { isObjectEmpty } = require('../tools/objects')

const createUser = async (data) => {
  if (!data || isObjectEmpty(data)) {
    throw new Error('Missing user')
  }
  const user = new User(data)
  const userSaved = await user.save()
  const userObject = userSaved.toObject()
  delete userObject.password
  return userObject
}

const getUserById = async (id) => {
  if (!id) {
    throw new Error('missing data')
  }
  const user = await User.findById(id).select('-password')
  const userObject = user.toObject()
  return userObject
}

const updateUserById = async (id, user) => {
  if (!id) {
    throw new Error('missing data')
  }
  if (!user) {
    throw new Error('missing user')
  }

  // On met à jour le user via la méthode mongoose findByIdAndUpdate
  const userUpdate = await User.findByIdAndUpdate(id, user, { new: true }).select('-password')

  const userObject = userUpdate.toObject()

  return userObject
}

const deleteUserById = async (id) => {
  if (!id) {
    throw new Error('missing data')
  }
  await User.findByIdAndDelete(id)
}

module.exports = {
  createUser,
  getUserById,
  updateUserById,
  deleteUserById
}
