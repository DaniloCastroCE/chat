
# Estrutura de Pastas de um Projeto Node.js

Este documento apresenta uma estrutura padrão para organizar um projeto Node.js, com índice, resumo e explicação detalhada de cada parte da arquitetura.

---

## 📑 Índice

1. [Resumo Geral](#resumo-geral)
2. [Estrutura Completa de Pastas](#estrutura-completa-de-pastas)
3. [Explicação Detalhada por Pasta](#explicacao-detalhada-por-pasta)

---

## 📌 Resumo Geral

Um projeto Node.js bem estruturado facilita a manutenção, escalabilidade e entendimento do sistema. A separação por responsabilidades (controllers, routes, models, etc.) torna o código mais limpo e modular.

Abaixo está uma estrutura típica de um projeto Node.js com Express:

```
meu-projeto/
│
├── node_modules/          
├── public/                
│   ├── css/
│   ├── js/
│   └── imagens/
│
├── src/                   
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── middlewares/
│   └── utils/
│
├── views/                 
├── docs/                  # Documentação, dicas, comandos úteis
│
├── .env                   
├── .gitignore             
├── package.json           
├── package-lock.json      
└── server.js              
```

---

## 🔍 Explicação Detalhada por Pasta

### 📁 `node_modules/`
- Pasta criada automaticamente pelo `npm install`, contendo as dependências do projeto.

### 📁 `public/`
- Arquivos estáticos acessíveis pelo frontend (HTML, CSS, JS, imagens).

---

### 📁 `src/` — Código-fonte principal

#### 📂 `controllers/`
**Responsável pela lógica das rotas.**
```js
const userService = require('../services/userService');
exports.getUsers = async (req, res) => {
  const users = await userService.findAllUsers();
  res.json(users);
};
```

#### 📂 `models/`
**Modelos de dados (ex: com Mongoose, Sequelize).**
```js
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({ name: String, email: String });
module.exports = mongoose.model('User', UserSchema);
```

#### 📂 `routes/`
**Define os caminhos da API.**
```js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
router.get('/users', userController.getUsers);
module.exports = router;
```

#### 📂 `services/`
**Contém a lógica de negócio.**
```js
const User = require('../models/User');
exports.findAllUsers = async () => {
  return await User.find();
};
```

#### 📂 `middlewares/`
**Funções intermediárias como autenticação ou validação.**
```js
module.exports = (req, res, next) => {
  if (!req.headers.authorization) return res.status(401).send('Não autorizado');
  next();
};
```

#### 📂 `utils/`
**Funções auxiliares reutilizáveis.**
```js
exports.formatDate = (date) => {
  return new Date(date).toLocaleDateString('pt-BR');
};
```

---

### 📁 `views/`
- Templates HTML se estiver usando um template engine como EJS, Pug etc.

### 📁 `docs/`
- Documentação, comandos úteis, dicas e anotações internas do projeto.

---

### 📄 Arquivos principais

- `.env` – Variáveis de ambiente (ex: senhas, conexões).
- `.gitignore` – Arquivos/pastas que o Git deve ignorar.
- `package.json` – Configurações e dependências do projeto.
- `server.js ou app.js` – Ponto de entrada do app (configurações iniciais e start do servidor).

---

> Ter uma estrutura clara ajuda qualquer desenvolvedor (incluindo você mesmo no futuro) a entender e dar manutenção no projeto com facilidade.
