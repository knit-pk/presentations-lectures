// Register models
require('../models/article')
const mongoose = require('mongoose')
const db = mongoose.createConnection('mongodb://localhost/db')
mongoose.Promise = global.Promise

db.on('error', (err) => {
  // For development purpose
  throw err
})

db.once('open', () => {
  console.info('Mongo db connected successfully')
})

module.exports = db
