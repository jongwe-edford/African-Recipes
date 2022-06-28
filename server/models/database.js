const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connecion error'))

db.once('open', function () {
  console.log('Connected')
})

// Models

require('./Category')
require('./Recipe')
