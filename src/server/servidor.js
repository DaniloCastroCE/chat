const {Server} = require('socket.io')
const sessionMiddleware = require('../conf/sessionMiddleware')
const Message = require('../models/message')
const User = require('../models/user')
let users = []

const servidor = (server) => {
  const io = new Server(server, {pingInterval: 25000, pingTimeout: 60000})

  io.use((socket, next) => {
    sessionMiddleware(socket.request, {}, next)
  })
  
  io.on('connection', async (socket) => {
    const session = socket.request.session
    if (session && session.user) {
      socket.username = session.user.nome
      users.push({nome: socket.username, id: socket.id})
      io.emit('users', users)
      onOffUser(socket, io, `${socket.username.toUpperCase()} está Online.`)
      await User.findByIdAndUpdate(
        session.user.id,             
        { status: 'online' }, 
        { new: true },
      );
    }else {
      socket.disconnect()
      return
    }
    const messages = await Message.find({}).sort({ createdAt: 1 })
    console.log(`Úsuario ${socket.username.toUpperCase()} se conectou.`)
    socket.emit('init', {users: users, messages: messages})

    socket.on('message', (message) => {
      recMessage(message, socket, io)
    })

   
    socket.on('disconnect', async (reason) => {
      console.log(`Usuario ${socket.username.toUpperCase()} se desconectou\nMotivo: ${reason}.`)
      users = users.filter(user => user.id !== socket.id)
      io.emit('users', users)
      onOffUser(socket, io, `${socket.username.toUpperCase()} está Offline.`)
      await User.findByIdAndUpdate(
        session.user.id,             
        { status: 'offline' }, 
        { new: true },
      );
      session.destroy((err) => {
        if (err) {
          console.error('Erro ao destruir a sessão:', err)
        } else {
          console.log('Sessão destruída com sucesso.')
        }
      })
    })
  })
}


const recMessage = (message, socket, io) => {
  if(message.trim() === '') return

  const newMessage = new Message({
    author: socket.username,
    userId: socket.request.session.user.id,
    message: message,
  })

  newMessage.save().then(() => {
    io.emit('messageAll', newMessage)
    console.log(`Mensagem recebida de ${socket.username.toUpperCase()}: ${message}`)
    //console.log(`Objeto salvo no banco de dados: ${newMessage}`)
  }).catch((err) => {
    console.log(err)
  })
}

const onOffUser = (socket, io, message) => {
  console.log(message)
  socket.broadcast.emit('on-off', message)
}

module.exports = servidor