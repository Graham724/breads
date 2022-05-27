const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')
const seedData = require('../models/seed.js')

breads.get('/test/:name', async (req, res) => {
  const breads = await Bread.getBreadBakedBy(req.params.name)
  res.send('test')
})

// NEW
breads.get('/new', (req, res) => {
  res.render('new')
})

breads.get('/seed', async (req, res) => {
  try {
    await Bread.insertMany(seedData)
    res.redirect('/breads')
  } catch (error) {
    console.log(error)
    res.send("ERROR")
  }
})


// INDEX
breads.get('/', async (req, res) => {
  try {
    const bread = await Bread.find()
    res.render('index', {
      breads: bread,
      title: 'Bread'
    })
  } catch (error) {
    console.log(error)
    res.send("ERROR")
  }
})



// SHOW
breads.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const bread = await Bread.findById(id)
    // console.log(bread)
    res.render('show', {
      bread
    })
  } catch (error) {
    console.log(error)
    res.send("ERROR")
  }
})

// CREATE
breads.post('/', async (req, res) => {
  try {
    if (!req.body.image) {
      delete req.body['image']
    }
    if(req.body.hasGluten === 'on') {
      req.body.hasGluten = true
    } else {
      req.body.hasGluten = false
    }

    await Bread.create(req.body)

    res.redirect('/breads')
  } catch (error) {
    console.log(error)
    res.send("ERROR")
  }
})

// DELETE
breads.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    await Bread.findByIdAndDelete(id)
    res.status(303).redirect('/breads')
  } catch (error) {
    console.log(error)
    res.send("ERROR")
  }
  
})

// EDIT
breads.get('/:id/edit', async (req, res) => {
  try {
    const { id } = req.params
    const bread = await Bread.findById(id)
    res.render('edit', {
      bread
    }) 
  } catch (error) {
    console.log(error)
    res.send("ERROR")
  }
})

// UPDATE
breads.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
  
    if(req.body.hasGluten === 'on'){
      req.body.hasGluten = true
    } else {
      req.body.hasGluten = false
    }
    await Bread.findByIdAndUpdate(id, req.body)
    res.redirect(`/breads/${id}`)
  } catch (error) {
    console.log(error)
    res.send("ERROR")
  }
})


module.exports = breads
