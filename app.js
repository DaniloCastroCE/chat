require('dotenv').config()
const session = require('express-session')
const RedisStore = require('connect-redis').default
const redis = require('redis');
const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000
const path = require('path')
const http = require('http')
const server = http.createServer(app)
const router = require('./src/router/router')
const connectServer = require('./src/server/Servidor')

const redisClient = redis.createClient({
  url: process.env.REDIS_URL // Utilize a URL do Redis fornecida no Railway
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
