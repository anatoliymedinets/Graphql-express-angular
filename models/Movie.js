const mongoose = require('mongoose')
const Schema = mongoose.Schema

const movieSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    directorId: {
      type: Schema.Types.ObjectId,
      ref: 'directors'
    }
})

module.exports = mongoose.model('movies',movieSchema)