require('dotenv').config()
const session = require('express-session')
const Redis = require('redis');
const RedisStore = require('connect-redis').default;
const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000
const path = require('path')
const http = require('http')
const server = http.createServer(app)
const router = require('./src/router/router')
const connectServer = require('./src/server/Servidor')

const redisClient = Redis.createClient({
  url: process.env.REDIS_URL // Essa variável é gerada automaticamente pelo Railway
});

redisClient.connect().catch(console.error); // conecta com Redis

const redisStore = new RedisStore({
  client: redisClient,
  prefix: "sess:", // prefixo para as chaves no Redis
});

const middlewareSession = session ({
    store: redisStore,
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
