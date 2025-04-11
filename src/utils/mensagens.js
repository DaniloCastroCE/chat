const {getTimeNow} = require('./getTempoNow')

const array_mensagens = []

exports.mensagens = (op,nome,text) => {
    switch (op) {
        case 'add':
            const msg = {
                nome: nome,
                text:text,
                create: getTimeNow(new Date).array_texts[3]
            }
            array_mensagens.push(msg)
            return msg

        case 'get':
            return array_mensagens

        default:
            console.log('Variavel OP com valor incorreto')
            break;
    }    
}
