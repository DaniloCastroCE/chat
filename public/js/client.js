class Client {
    constructor(elPainel, elUsers, elMeuNome) {
        this.meuNome = ''
        this.socket = io()
        this.users = []
        this.mensagens = []
        try {
            this.elPainel = elPainel
            this.elUsers = elUsers
            this.elMeuNome = elMeuNome
        } catch (error) {
            console.error(error)
        }

        this.socket.on('connect', () => {
            console.log(`Client conectado ao servidor (id: ${this.socket.id})`)
            try {
                this.setNomeUsuario()

                this.socket.on('all', (msg) => {
                    //console.log(msg)
                    this.attElPainel(msg)
                })

                this.socket.on('attUsers', (users) => {
                    this.users = users.usuarios
                    //console.log({ users: this.users, msg: users.msg })
                    this.attElUsers()
                    this.elPainel.innerHTML += `<li class="userAtt">${users.msg}</li>`
                    this.elPainel.scrollTop = this.elPainel.scrollHeight
                })

                setInterval(() => {
                    this.socket.emit('heartbeat', { status: 'alive' })
                }, 25000)

            } catch (error) {
                console.error('(1) Error: ', error)
                console.log('Desconectando cliente (', this.socket.id, ')')
                this.socket.disconnect()
            }

        })

        this.socket.on('disconnect', (reason) => {
            console.log(`Cliente (ID ${this.socket.id} foi desconectado (Motivo: ${reason})`)
        })

    }
    setNomeUsuario() {
        const nome = prompt('Digite seu nome:').trim().toLowerCase();

        this.socket.emit('setNome', nome, (resp) => {
            //console.log(resp.msg);

            if (resp.status !== 'ok') {
                alert(resp.msg);
                this.setNomeUsuario();
            } else {
                this.meuNome = nome
                this.elMeuNome.innerHTML = nome
                this.socket.emit('getUsers', (users) => {
                    this.users = users
                    this.mensagens = resp.mensagens
                    //console.log({ mensagens: this.mensagens })
                    this.mensagens.forEach(el => {
                        this.attElPainel(el)
                    })
                })
            }
        });
    }

    enviarMensagem = (text, callback) => {
        this.socket.emit('msg', text)
    }

    attElPainel = (msg) => {
        const nome = msg.usuario_nome === this.meuNome ? 'Eu  digo' : `${msg.usuario_nome}  diz`
        const texto = msg.msg.replace(/\n/g, "<br>")

        this.elPainel.innerHTML += `
                <li class="li-painel">
                    <span class="span-nome lato-black emLinha">${nome.charAt(0).toUpperCase() + nome.slice(1)}: </span>
                    <p class="p-painel roboto-mono-destaque emLinha">${texto}</p>
                </li>
        `

        /*this.elPainel.innerHTML = `
                <li class="li-painel">
                    <span class="span-nome lato-black emLinha">${nome.toUpperCase()}</span>
                    <p class="p-painel roboto-mono-destaque emLinha">${texto}</p>
                </li>
                ${this.elPainel.innerHTML}
        `*/

        this.elPainel.scrollTop = this.elPainel.scrollHeight

    }
    attElUsers = () => {
        //console.log('attElUsers', this.users)
        this.elUsers.innerHTML = ''
        this.users.forEach((el) => {
            const nome = el[0].user
            this.elUsers.innerHTML += `<li>${nome.charAt(0).toUpperCase() + nome.slice(1)}</li>`
        })
    }

}


