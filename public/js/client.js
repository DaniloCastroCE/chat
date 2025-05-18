class Client {
  constructor(callback_receiveMessage, callback_users, callback_on_off) {
    this.receiveMessage = callback_receiveMessage
    this.socket = io()
    this.socket.on('connect', async () => {
      console.log(`Você se conectou.`)
    })

    this.socket.on('init', (obj) =>{
      obj.messages.forEach(message => {
        this.receiveMessage(message)
      })
    })

    this.socket.on('users', (users) => {callback_users(users)})

    this.socket.on('on-off', (message) => {callback_on_off(message)})
    
    this.socket.on('messageAll', (message) => {
      this.receiveMessage(message)   
    })

    this.socket.on('disconnect', (reason) => {
      console.log(`Você se desconectou.\nMotivo: ${reason}.`)
      location.reload();
    })
    
  }

  sendMessage(message) {
    if(message.trim() !== ''){
      this.socket.emit('message', message)
      return
    }
    console.log('Mensagem vazia.')
  }
}