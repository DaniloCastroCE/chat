const client = new Client(
    document.querySelector('.painel'),
    document.querySelector('.users'),
    document.querySelector('.meuNome')
)

const sendMsg = () => {
    const texto = document.querySelector('.text-textarea')
    
    if(texto.value.trim() !== ''){
        client.enviarMensagem(texto.value.trim() )
        texto.value = ''
    }
}
document.querySelector('.env-btn').addEventListener('click', sendMsg)
document.querySelector('.text-textarea').addEventListener('keydown', (e) => {
    if(e.key === "Enter" && !e.shiftKey){
        e.preventDefault()
        sendMsg()
    }
})
