const mongoExpressConfig = require('./config/mongo-express.js')
const mongoExpress = require('mongo-express/lib/middleware')
const bodyParser = require('body-parser')
const express = require('express')
const http = require('http')
const app = express()

require('./config/mongoose-instance.js') // Initialize db connection (Runs only once)

// Set view engine to use pug templates
app.set('view engine', 'pug')

// Set port to 3000
app.set('port', 3000)

// Reqister middlewares here
// See https://expressjs.com/en/resources/middleware.html
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/mongodb-admin', mongoExpress(mongoExpressConfig)) // Visual MongoDB Admin

// Custom middleware it redirects from all urls ending with /
// to urls not including /
app.use(function (req, res, next) {
  const url = req.originalUrl
  const urlLength = url.length

  if (urlLength > 1 && url[urlLength - 1] === '/') {
    res.redirect(url.slice(0, urlLength - 1))
  }

  next()
})

// Register Routes (Routes are middlewares that is why we use 'use')
app.use('/articles', require('./routes/article.js'))

// Create root route
app.get('/', (req, res) => {
  // Express looks for files in /views by default
  res.render('index', { title: 'Mongodb Introduction', message: 'Welcome to Mongodb Introduction' })
})

http.createServer(app).listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'))
})
