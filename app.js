// require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 3000
const path = require('path')
const http = require('http')
const server = http.createServer(app)
const router = require('./src/router/router')
const connectServer = require('./src/server/Servidor')
const session = require('express-session')
const palavraSecret = 'minha-palavra-secreta-daniel'

const middlewareSession = session ({
    secret: palavraSecret,
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
