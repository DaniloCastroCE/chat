const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    minlength: 3,
    lowercase: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  senha: {
    type: String,
    required: true,
    minlength: 4
  },
  status: {
    type: String,
    required: true,
    default: 'offline'
  }
    
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)