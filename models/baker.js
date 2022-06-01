// dependencies
const mongoose = require('mongoose')


// schema
const bakerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
        enum: ['Rachel', 'Monica', 'Joey', 'Chandler', 'Ross', 'Phoebe']
    }, 
    startDate: {
        type: Date,
        required: true
    },
    bio: {
        type: String,
        required: false
    }
}, 
{ toJSON: { virtuals: true } })

// Virtuals:
bakerSchema.virtual('breads', {
    ref: 'Bread',
    localField: '_id',
    foreignField: 'baker'
})

// model and export
module.exports = mongoose.model('Baker', bakerSchema)


