const getNome = async (callback) => {
  const response = await fetch('/getUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const data = await response.json();
  callback(data)
}

let user = null
getNome(data => {
  user = data
  const nome = document.querySelector('#nome')
  const email = document.querySelector('#email')
  nome.innerHTML = `Nome: ${user.nome.toUpperCase()}`
  email.innerHTML = `Email: ${user.email.toUpperCase()}`
})




const sendMessage = () => {
  const message = document.querySelector('#message-input')
  if(message.value.trim() === '') return
  client.sendMessage( message.value )
  message.value = ''
  message.focus()
}

const getUsers = (users) => {
  console.log(users)
  const usersList = document.querySelector('#users-list')
  usersList.innerHTML = ''
  users.forEach(user => {
    usersList.innerHTML += `<li>${user.nome.toUpperCase()}</li>`
  })
} 

const receiveMessage = (message) => {
  const messagesList = document.querySelector('#messages-list')
  const date = new Date(message.createdAt)
  const timestamp = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} às ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`

  const nome = message.author === user.nome ? 'Você:' : message.author.toUpperCase() + ':'
  const text = message.message.replace(/\n/g, '<br>')
  const isYourMessage = message.author === user.nome ? 'voce' : ''

  const cod = `
    <li class="li-mensagem ${isYourMessage}">
      <p class="mensagem"><span class="username">${nome}</span>  ${text}</p>
      <span class="timestamp">${timestamp}</span>
    </li>
  `
  messagesList.innerHTML += cod

  scrollToBottom('chat')
}

const scrollToBottom = (id) => {
  const element = document.querySelector(`#${id}`)
  element.scrollTop = element.scrollHeight
}


const on_off = (message) => {
  const messagesList = document.querySelector('#messages-list')
  const cod = `
    <li class="li-mensagem infoUser">
      <p class="mensagem">${message}</p>
    </li>
  `
  messagesList.innerHTML += cod
}

const client = new Client(receiveMessage, getUsers, on_off)

document.querySelector('#message-input').addEventListener('keypress', (e) => {
  if(e.key === 'Enter' && !e.shiftKey){
    e.preventDefault()
    sendMessage()
  }
})
