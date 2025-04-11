const { Server } = require('socket.io')
const { getTimeNow } = require('../utils/getTempoNow')
const { users } = require('../utils/users')
const {mensagens} = require('../utils/mensagens')

const connectServer = (server, middlewareSession) => {
    const io = new Server(server, {
        pingInterval: 25000,
        pingTimeout: 60000,
    })

    io.use((socket, next) => {
        middlewareSession(socket.request, socket.request.res || {}, next)
    })

    io.on('connection', (socket) => {
        const username = socket.request.session.usuario
            ? socket.request.session.usuario.nome
            : "Desconhecido";
        socket.username = username;

        if(username == 'Desconhecido'){
            socket.emit('status', ({status:'disconnect', msg:'Você foi desconectado do servidor'}))
            socket.disconnect(true)
        } 

        console.log(mensagensConsole([socket])[0])

        func_mensagens(socket)

        socket.emit('init', {nome: socket.username, msgs: mensagens('get')})

        socket.on('disconnect', (reason) => {
            console.log(mensagensConsole([socket, reason])[1])
            socket.request.session.destroy((err) => {
                if(err) {
                    console.error('Erro em destruir a sessão do cliente ', socket.id)
                }else {
                    console.log(`Cliente ${socket.username} com ID ${socket.id} foi destruido`)
                }
            })
        })

        
    })

    const mensagensConsole = (array) => {
        return [
            // Cliente Conectado
            `\n------------------------------\n${getTimeNow().array_texts[2]}\nCliente ${array[0].username ? array[0].username + ' ' : ''}com ID ${array[0].id} está conectado.\n------------------------------`,

            // Cliente desconectado
            `\n------------------------------\n${getTimeNow().array_texts[2]}\nCliente com ID ${array[0].id} foi desconectado.\nMotivo: ${array[1]}\n------------------------------`
        ]
    }

    const func_mensagens = (socket) => {
        socket.on('mensagens', (text) => {
            const msg = mensagens('add',socket.username,text)
            io.emit('mensagens_all', msg)
            console.log(mensagens('get'))
        })
    }
}

module.exports = connectServer