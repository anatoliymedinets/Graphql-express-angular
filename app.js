const express = require('express')
const cors = require('cors')
const graphqlHTTP = require('express-graphql')

const schema = require('./schema/schema')
const movieRoute = require('./routes/movie')


const app = express()
app.use(cors())

function setUser(req, res, next){
  req.user = req.headers.authorization
  next()
}

app.use('/graphql',setUser , graphqlHTTP({
  schema,
  graphiql: true
}))

app.use('/movie', movieRoute)

module.exports = app