const express = require('express')
const router = express.Router()
const path = require('path')
const {addUser,chkUser,existeUsuario} = require('../utils/users')

const checkUsuario = (req, res, next) => {
    if(req.session.usuario){
        return next()
    }
    return res.redirect('/')
}

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'))
})

router.get('/chat', checkUsuario, (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/pages/chat.html'))
})

router.get('/registrar', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/pages/register.html'))
})

router.post('/register', (req, res) => {
    const {nome,senha,chkSenha} = req.body

    if(!nome || !senha) {
        return res.status(400).send('Nome e senha são obrigatórios.')
    }

    if(senha !== chkSenha){
        return res.status(400).send('Os campos Senha e Confirmar senha estão diferentes')
    }

    if(chkUser(nome)){
        return res.status(400).send('Úsuario já existe')
    }

    const novoUsuario = addUser(nome,senha)
    console.log(`Novo usuario cadastrado. (${novoUsuario.nome})`)
    req.session.usuario = {nome: novoUsuario.nome}
    return res.redirect('/chat')

})

router.post('/login', (req, res) => {
    const {nome,senha} = req.body
    if(existeUsuario(nome,senha)){
        req.session.usuario = {nome: nome.toLowerCase().trim()}
        
        return res.redirect('/chat')
    }
    return res.redirect('/')
})

module.exports = router