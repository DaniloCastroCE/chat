const users = [{nome: 'danilo', senha: '0708', create_data: new Date().toISOString()}]

const addUser = (nome,senha) => {
    const user = {
        nome,
        senha,
        create_data: new Date().toISOString()
    }
    users.push(user)
    return user
}

const chkUser = (nome) => {
    return users.some(user => user.nome.toLowerCase().trim() === nome.toLowerCase().trim())
}

const existeUsuario = (nome,senha) => {
    const valor = users.some((user) => 
        user.nome.toLowerCase().trim() === nome.toLowerCase().trim() &&
        user.senha === senha
    )
    return valor
}

module.exports = {
    users,
    addUser,
    chkUser,
    existeUsuario,
}