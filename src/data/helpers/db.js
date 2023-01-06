const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const connect = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`)
    console.log('Database connected')
  } catch (error) {
    console.error('Error while connecting to database : ' + JSON.stringify(error))
  }
}

module.exports = {
  connect
}
