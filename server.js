// DEPENDENCIES
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const bakerRoutes = require('./controllers/baker_controller')


// CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT
const app = express()

// MIDDLEWARE
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use (express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))




// ROUTES
app.get('/', (req, res) => {
  res.send('Welcome to an Awesome App about Breads!')
})

  
  // Breads
  const breadsController = require('./controllers/breads_controller.js')
  app.use('/breads', breadsController)

  app.use('/bakers', bakerRoutes)


  // 404 Page
  app.get('*', (req, res) => {
    res.send('404')
  })

  //db connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('DB connected'))
.catch(err => console.error(err));
  

// LISTEN
app.listen(PORT, () => {
  console.log('listening at port', PORT);
})
