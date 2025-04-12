require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000
const path = require('path')
const http = require('http')
const server = http.createServer(app)
const router = require('./src/router/router')
const connectServer = require('./src/server/Servidor')
const session = require('express-session')
const RedisStore = require('connect-redis')(session);
const redis = require('redis');

const redisClient = redis.createClient({
  host: 'localhost', // Ou a URL do seu servidor Redis
  port: 6379, // A porta do Redis, geralmente 6379
});

const middlewareSession = session ({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: true,
})

app.use(middlewareSession)
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(router)

connectServer(server,middlewareSession)

server.listen(PORT, '0.0.0.0', () => {
    console.log('Servidor online da porta ', PORT)
})
