const addLi = new AddLi()
let meuNome = ''

const client = new Client( (obj) => {
    document.querySelector(`#meuNome`).innerHTML = obj.nome.toUpperCase()
    meuNome = obj.nome.toUpperCase()
    obj.msgs.forEach(el => {
        addLi.addMgs('mensgens', el.nome, el.create, el.text)
    })
}, (msg) => rec_msg (msg))


document.querySelector('#chat-texto').addEventListener('keydown', (e) => {
    if(e.key === 'Enter' && !e.shiftKey){
        addLi.enviar('chat-texto',callback_envMsg)
        e.preventDefault()
    }
})

const on_click = () => addLi.enviar('chat-texto',callback_envMsg)

const callback_envMsg = (texto) => {
    client.client_enviar_msg(texto)
}

const rec_msg = (msg) => {
    console.log('rec ',msg)
    const nome = msg.nome.toUpperCase().trim() === meuNome ? 'Você' : msg.nome
    addLi.addMgs('mensgens', nome, msg.create, msg.text,true)
}