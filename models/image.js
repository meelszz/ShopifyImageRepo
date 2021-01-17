const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageContent: {
        type: Buffer,
        required: true
    },
    imageType: {
        type: String,
        required: true
    }
})

imageSchema.virtual('imageUploadPath').get(function() {
    if (this.imageContent != null && this.imageType != null) {
        return `data:${this.imageType};charset=utf-8;base64,
        ${this.imageContent.toString('base64')}`
    }
})

module.exports = mongoose.model('Image', imageSchema)