const express = require('express')
const router = express.Router()
const Image = require('../models/image.js')
const imageMimeTypes = ['image/jpeg','image/jpg', 'image/png', 'images/gif']

// All Images Route
router.get('/', async (req, res) => {
    try {
        const images = await Image.find({})
        res.render('images/index', {
            images: images
        })
    } catch {
        res.redirect('/')
    }
    
})

// New Image Route
router.get("/new", (req, res) => {
    renderNewPage(res, new Image())
})

// Create Image Route
router.post('/', async (req, res) => {
    const image = new Image()
    saveImage(image, req.body.imageUpload)

    try {
        await image.save()
        res.redirect('images')
    } catch {
        console.log("Create image route catch")
        renderNewPage(res, image, true)
    }
})

function renderNewPage(res, image, hasError = false) {
    try {
        const params = {
            image: image
        }
        if (hasError) params.errorMessage = 'Error Adding Image'
        res.render('images/new', params)
    } catch {
        res.redirect('/images')
    }
}

function saveImage(image, imageEncoded) {
    if (imageEncoded == null) return
    const imgObj = JSON.parse(imageEncoded)
    if (imgObj != null && imageMimeTypes.includes(imgObj.type)) {
        image.name = imgObj.name
        image.imageContent = new Buffer.from(imgObj.data, 'base64')
        image.imageType = imgObj.type
    }
}

module.exports = router