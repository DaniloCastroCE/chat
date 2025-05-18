const express = require('express')
const path = require('path')
const validator = require('validator') 
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')

const authMiddleware = (req, res, next) => {
  if(!req.session.user){
    return res.render('index', {status: 'error', message: 'Você precisa estar logado para acessar essa página!'})
  }else {
    next()
  }
}

// Rotas GET

router.get('/home', authMiddleware, (req, res) =>{
  return res.sendFile(path.join(__dirname, '../../public/home.html'))
})

router.get('/logout', (req, res) => {
  const nome = req.session.user?.nome || 'Usuário'

  req.session.destroy(err => {
    if (err) {
      res.clearCookie('connect.sid')
      console.error('Erro ao destruir a sessão:', err)
      return res.render('index', { status: 'error', message: 'Erro ao fazer logout!' })
    }

    return res.render('index', {
      status: 'success',
      message: `${nome.toUpperCase()} foi deslogado com sucesso!`
    })
  })
})

router.get('/', (req, res) => {
  return res.render('index', {status: null, message: null})
})

router.get('/register', (req, res) => {
  return res.render('register', {status: null, message: null})
})


// Rotas POST

router.post('/register', async (req, res) => {
  const {nome, email, senha} = req.body
  
  if(!nome || !email || !senha){
    return res.render('register', {status: 'error', message: 'Preencha todos os campos!'})  
  }


  if(nome.trim().length < 3) {
    return res.render('register', {status: 'error', message: 'O nome deve ter no mínimo 3 caracteres!'})
  }

  if(senha.trim().length < 4){
    return res.render('register', {status: 'error', message: 'A senha deve ter no mínimo 4 caracteres!'})
  }

  if(await User.findOne({email: email.trim()})){
    return res.render('register', {status: 'error', message: 'Email já cadastrado! Tente outro.'})
  }
  
  if(validator.isEmail(email) === false){
    return res.render('register', {status: 'error', message: 'Email inválido!'})
  }

  const hash = await bcrypt.hash(senha.trim(), 10)

  const novoUsuario = new User({
    nome: nome.trim(),
    email: email.trim(),
    senha: hash
  })

  await novoUsuario.save()

  return res.render('index', {status: 'success', message: `${nome.toUpperCase()} cadastrado com sucesso!`})
  
})

router.post('/login', async (req, res) => {
  const {email, senha} = req.body

  if(!email || !senha) {
    return res.render('index', {status: 'error', message: 'Preencha todos os campos!'})
  }

  const user = await User.findOne({ email: email.trim().toLowerCase() })

  if (!user){
    return res.render('index', {status: 'error', message: 'Email não cadastrado!'})
  }

  const senhaCorreta = await bcrypt.compare(senha.trim(), user.senha)

  if (!senhaCorreta) {
    return res.render('index', { status: 'error', message: 'Senha incorreta!' })
  }

  if(user.status === 'online'){
    return res.render('index', {status: 'error', message: 'Usuário está logado em outra página!'})
  }

  req.session.user = {nome: user.nome, email: user.email, id: user._id, status: user.status}
  
  return res.redirect('/home')
})

router.post('/getUser', (req, res) => {
  if(req.session.user) {
    const nome = req.session.user.nome
    const email = req.session.user.email
    const id = req.session.user.id
    return res.json({nome: nome, email: email, id: id})
  }else {
    return res.json({nome: null})
  }
})

module.exports = router