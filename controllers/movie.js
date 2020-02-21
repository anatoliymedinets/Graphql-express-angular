const Movie = require('../models/Movie')


module.exports.getAll = async (req, res)=>{
    const movies = await Movie.find()
    res.status(200).json(movies)
}