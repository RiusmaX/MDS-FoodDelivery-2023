require('dotenv').config()

const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const app = express()
const port = process.env.port || 3000

const morgan = require('morgan')
morgan('dev')

// Ajout de 9 middlewares de sécurité
app.use(helmet())
// Gestion du cross-origin
app.use(cors())

// Parmétrage de Express pour le body et le JSON
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Connection DB
require('./data/helpers/db').connect()

app.get('/', (req, res) => {
  res.send('Hello world Express !')
})

app.listen(port, () => {
  console.log('Server is running on port ' + port)
})
