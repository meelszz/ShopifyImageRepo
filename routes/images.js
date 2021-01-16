const express = require('express')
const router = express.Router()
const Image = require('../models/image.js')

// All Images Route
router.get('/', async (req, res) => {
    try {
        const images = await Image.find({})
        res.render('images/index', {images: images})
    } catch {
        res.redirect('/')
    }
})

// New Image Route
router.get("/new", (req, res) => {
    res.render('images/new', { image: new Image() })
})

// Create Image Route
router.post('/', async (req, res) => {
    const image = new Image({
        name: req.body.name
    })
    try {
        const newImage = await image.save()
        // res.redirect(`images/${newImage.id}`)
        res.redirect(`images`)
    } catch {
        res.render('images/new', {
        image:image,
        errorMessage: 'Error adding image'
        })
    }
})

module.exports = router