require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const http = require('http')
const server = http.createServer(app)
const PORT = process.env.PORT || 4000
const router = require('./src/router/router')
const connectDB = require('./src/conf/db')
const sessionMiddleware = require('./src/conf/sessionMiddleware')
const servidor = require('./src/server/servidor')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

connectDB()

app.use(sessionMiddleware)

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(router)

servidor(server)

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor online na porta ${PORT}`)
})
