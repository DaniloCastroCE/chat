class AddLi {
    constructor () {
        
    }
    addMgs = (ul_id,name,date,text,eu) => {

    
        const textConvertido = text.replace(/\n/g, '<br>');
    
        const li = document.createElement('li')
        const nome = document.createElement('span')
        const data = document.createElement('p')
        const texto = document.createElement('p')
        
        li.className = 'li-chat'
        nome.className = 'li-chat-nome'
        data.className = 'li-chat-data'
        texto.className = 'li-chat-texto'
        
        if(typeof eu === 'undefined' || !eu){
            nome.textContent = name.toUpperCase()
        }else {
            nome.textContent = name
        }
    
        const spanNome = Object.assign(document.createElement('span'), {
            textContent: ' diz:',
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

    enviar (textarea_id, callback) {
        const textarea = document.querySelector(`#${textarea_id}`)
        const texto = textarea.value
        textarea.value = ''
        
        if(texto === '') return
        textarea.focus()
        callback(texto)

    }
}