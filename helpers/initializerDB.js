const Movie = require('../models/Movie')
const Director = require('../models/Director')

module.exports.initialize = async ()=>{
 var directors = await Director.find()
 var movies = await Movie.find()

    let director_1 
    let director_2 
    let director_3 

  if(directors.length <= 0){

    director_1 = new Director({ name: 'Tolik', age: 25})
    director_2 = new Director({ name: 'Anatoliy', age: 28})
    director_3 = new Director({ name: 'Some Name', age: 43})

    await Director.insertMany([
      director_1,
      director_2,
      director_3
    ])
    console.log('added directors')
  }

  if(movies.length <=0 ){
    await Movie.insertMany([
      { name: 'movie 1', genre: 'horror', directorId: director_1._id},
      { name: 'movie 2', genre: 'horror', directorId: director_2._id},
      { name: 'movie 3', genre: 'crime', directorId: director_2._id},
      { name: 'movie 4', genre: 'horror', directorId: director_2._id},
      { name: 'movie 5', genre: 'crime', directorId: director_3._id},
      { name: 'movie 6', genre: 'crime', directorId: director_1._id},
      { name: 'movie 7', genre: 'horror', directorId: director_1._id}
    ])
    console.log('added movies')
  }

 }
