const { Server } = require('socket.io')
const usuarios = []
let mensagens = []

const converterData = (data) => {
    const dia = String(data.getDate()).padStart(2, '0')
    const mes = String(data.getMonth() + 1).padStart(2, '0')
    const ano = data.getFullYear()

    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
    const segundos = String(data.getSeconds()).padStart(2, '0');

    return {
        dia: dia,
        mes: mes,
        ano: ano,
        h: horas,
        m: minutos,
        s: segundos,
        text: `${dia}/${mes}/${ano} - ${horas}:${minutos}`
    }
}

const checkArrayMsg = () => {
    const max = 300
    if(mensagens.length > max){
        mensagens = mensagens.slice(-max)
        console.log(mensagens)
    }

}

const connectServer = (server) => {
    const io = new Server(server, {
        pingInterval: 25000,
        pingTimeout: 60000,
    })

    io.on('connection', (socket) => {
        console.log(`Cliente com ID ${socket.id} está conectado`)

        socket.on('setNome', (nome, callback) => {
            if (!usuarios.some(usuario => usuario.nome === nome.toLowerCase().trim())) {
                const usuario = {
                    nome: nome.toLowerCase().trim(),
                    id: socket.id,
                    create: converterData(new Date)
                }
                socket.username = usuario.nome
                usuarios.push(usuario)
                console.log(`usuario ${usuario.nome} online com sucesso`)
                callback(
                    {
                        status: 'ok',
                        msg: `Nome ${usuario.nome} cadastrado com suscesso`,
                        mensagens: mensagens
                    }
                )
                attUsers(`${usuario.nome.toUpperCase()} entrou da sala`)
            }
            else {
                callback({ status: 'erro', msg: `Nome ${nome} ja existe` })
            }

        })

        socket.on('msg', (text) => {
            if (typeof text !== 'undefined' && text !== null && text.trim() !== '') {
                const user = usuarios.find(user => user.nome === socket.username)
                const msg = {
                    usuario_nome: user.nome,
                    usuario_id: user.id,
                    horario: converterData(new Date()),
                    msg: text,
                }
                mensagens.push(msg)
                checkArrayMsg()
                io.emit('all', msg)
            }
        })

        socket.on('getUsers', (callback) => {
            callback(usuarios.map(user => [{ user: user.nome, hora: user.create.text }]))
        })


        socket.on('disconnect', (reason) => {
            console.log(`Cliente com ID ${socket.id} foi desconectado pelo motivo ${reason}`)
            const index = usuarios.findIndex((u) => u.id === socket.id);
            let userSaiu = ''
            try {
                userSaiu = socket.username.toUpperCase()
            } catch (error) {
                userSaiu = '( ! Erro ao carregar nome ! )'
            }

            if (index !== -1) {
                console.log(`Usuário "${usuarios[index].nome}" removido.`);
                usuarios.splice(index, 1);
            }
            attUsers(`${userSaiu} saiu da sala`)

        })
    })

    const attUsers = (msg) => {
        io.emit('attUsers', { usuarios: usuarios.map(user => [{ user: user.nome, hora: user.create.text }]), msg: msg })
    }

}

module.exports = connectServer

