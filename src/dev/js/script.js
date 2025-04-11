class AddLi {
    addMgs = (ul_id,name,date,text) => {
    
        const textConvertido = text.replace(/\n/g, '<br>');
    
        const li = document.createElement('li')
        const nome = document.createElement('span')
        const data = document.createElement('p')
        const texto = document.createElement('p')
        
        li.className = 'li-chat'
        nome.className = 'li-chat-nome'
        data.className = 'li-chat-data'
        texto.className = 'li-chat-texto'
        
        nome.textContent = name.toUpperCase()
    
        const spanNome = Object.assign(document.createElement('span'), {
            textContent: ' ',
            className: 'li-chat-span-nome'
          });
        
        texto.appendChild(nome)
        texto.appendChild(spanNome)
        data.textContent = date
    
        texto.innerHTML += `${textConvertido}`
        
    
        
        li.appendChild(texto)
        li.appendChild(data)
    
        document.querySelector(`#${ul_id}`).appendChild(li)
    }
    addUser = (ul_id,name) => {
        const li = document.createElement('li')
        const nome = document.createElement('p')

        nome.textContent = name
        nome.className = 'li-users-nome'

        li.appendChild(nome)

        document.querySelector(`#${ul_id}`).appendChild(li)
    }

    enviar (textarea_id) {
        const textarea = document.querySelector(`#${textarea_id}`)
        const texto = textarea.value
        textarea.value = ''
        
        if(texto === '') return
        textarea.focus()
        alert(texto)

    }

} 

document.querySelector('#chat-texto').addEventListener('keydown', (e) => {
    if(e.key === 'Enter' && !e.shiftKey){
        new AddLi().enviar('chat-texto')
        e.preventDefault()
    }
})

const on_click = () => new AddLi().enviar('chat-texto')


const texto = `Um dia, um cão ia atravessando uma ponte, carregando um osso na boca.

Olhando para baixo, viu sua própria imagem refletida na água. Pensando ver outro cão, cobiçou-lhe logo o osso e pôs-se a latir. Mal, porém, abriu a boca, seu próprio osso caiu na água e se perdeu para sempre.` 

new AddLi().addMgs('mensgens','danilo','20:00:00 - 01/04/1989',texto)

new AddLi().addMgs('mensgens','danilo','20:00:00 - 01/04/1989',texto)

new AddLi().addMgs('mensgens','danilo','01/04/1989 - 20:00:00','oi <b>tudo bem</b> como você está as as das d ')

new AddLi().addUser('users','danilo')
