
const express = require('express')
const path = require('path')
const app = express()
const http = require('http')
const server = http.createServer(app)
const PORT = 3000
const router = require('./router/Router')
const connectServidor = require('./server/ConfigServer')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(router)

connectServidor(server)

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor está online na porta ${PORT}`)
})
