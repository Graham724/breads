const router = require('express').Router();
const Baker = require('../models/baker')
const BakerSeedData = require('../models/bakerSeed')

router.get('/seed', async (req, res) => {
    try {
        await Baker.insertMany(BakerSeedData)
        res.redirect('/breads')
      } catch (error) {
        console.log(error)
        res.send("ERROR")
      }
})

// Index: 
router.get('/', async (req, res) => {
    try {
        let bakers = await Baker.find()
        .populate('breads')
       res.send(bakers)
    } catch (error) {
        console.log(error)
        res.send("ERROR")
    }
})  

router.get( '/:id', async (req, res) => {
    const { id } = req.params
    let baker = await Baker.findById(id).populate('breads')
    res.render('bakerShow', {
        baker
    })
})


module.exports = router