require('dotenv').config()
const session = require('express-session')
const MongoStore = require('connect-mongo')

const tempo = 4 // Horas

const sessionMiddleware = session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    collectionName: 'sessions-chat',
    ttl: tempo * 60 * 60
  }),
  cookie: {
    maxAge: tempo * 60 * 60 * 1000
  }
})

module.exports = sessionMiddleware