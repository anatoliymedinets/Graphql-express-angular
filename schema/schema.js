const graphgl = require('graphql')

const Director = require('../models/Director')
const Movie = require('../models/Movie')

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLSchema} = graphgl

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: new GraphQLNonNull(GraphQLString)},
    genre : {type: new GraphQLNonNull(GraphQLString)},
    director: {
      type: new GraphQLNonNull(DirectorType),
      async resolve(parent, args) {
        return await Director.findById(parent.directorId)
      }
    }
  })
})

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) },
    movies: {
      type: new GraphQLList(MovieType),
      async resolve(parent, args){
        return await Movie.find({directorId: parent.id})
      }
    }
  })
})

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movie: {
      type: MovieType,
      args: { id: {type: GraphQLID}},
      async resolve(parent, args, context){

        const user = JSON.parse(context.user)
         console.log(user)
        return await Movie.findById(args.id)
      }
    },
    director: {
      type: DirectorType,
      args: { id: {type: GraphQLID}},
      async resolve(parent, args){
        
        return await Director.findById(args.id)
      }
    },
    movies: {
      type: new GraphQLList(MovieType),
      async resolve(parent, args){
        return await Movie.find()
      }
    },
    directors: {
      type: new GraphQLList(DirectorType),
      async resolve(parent, args){
        return await Director.find()
      }
    }
  }
  
})

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addDirector: {
      type: DirectorType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString) },
        age: {type: new GraphQLNonNull(GraphQLInt) }
      },
      async resolve(parent, args){
        const director = new Director({...args})
        return await director.save()
      }
    },
    updateDirector: {
      type: DirectorType,
      args: {
        id: {type: GraphQLID},
        name: { type: new GraphQLNonNull(GraphQLString)},
        age: { type: new GraphQLNonNull(GraphQLInt)},
      },
      async resolve(parent, args){
        const {id, ...fields} = args
        return await Director.findByIdAndUpdate(
          id, 
          { $set: {...fields}}, 
          {new: true}
        )
      }
    },
    removeDirector: {
      type: DirectorType,
      args: {
        id: {type: GraphQLID }
      },
      async resolve(parent, args){
        return await Director.findByIdAndDelete(args.id)
      }
    },
   
    addMovie: {
      type: MovieType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString) },
        genre: {type: new GraphQLNonNull(GraphQLString) },
        directorId: {type: new GraphQLNonNull(GraphQLID) }
      },
      async resolve(parent, args){
        const movie = new Movie({...args})
        return await movie.save()
      }
    },
    updateMovie: {
      type: MovieType,
      args: {
        id: {type: GraphQLID},
        name: { type: new GraphQLNonNull(GraphQLString)},
        genre: { type: new GraphQLNonNull(GraphQLString)},
        directorId: {type: new GraphQLNonNull(GraphQLID)}
      },
      async resolve(parent, args){
        const {id, ...fields} = args
        return await Movie.findByIdAndUpdate(
          id, 
          { $set: {...fields}}, 
          {new: true}
        )
      }
    },
    removeMovie: {
      type: MovieType,
      args: {
        id: {type: GraphQLID }
      },
      async resolve(parent, args){
        return await Movie.findByIdAndDelete(args.id)
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation
})