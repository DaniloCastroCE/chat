require('dotenv').config()
const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('Conexão com o banco de dados estabelecida com sucesso!')
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error)
  }
}

module.exports = connectDB