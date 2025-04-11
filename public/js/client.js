class Client {
    constructor (init,receb_msg) {
        this.socket = io()
        this.socket.on('connect', () => {
            console.log(`Cliente com ID ${this.socket.id} se conectou no servidor.`)
        })

        this.socket.on('status', (obj) => {
            console.log(obj.text)
            document.body.innerHTML = `Status: ${obj.status} / Mensagem: ${obj.msg}`
        })

        this.socket.on('init', (obj) => {
            init(obj)
        })
        
        this.socket.on('mensagens_all', (msg) => {
            receb_msg(msg)
        })
        
        this.socket.on('disconnect', (reason) => {
            console.log(`Cliente foi desconectado do servidor.\nMotivo: ${reason}`)
        })
        
        setInterval(()=> {
            this.socket.emit('heartbeat', {status: 'alive', timestamp: new Date().toISOString()})
        }, 10000)
    }

    client_enviar_msg (text) {
        this.socket.emit('mensagens', text)
    }
}