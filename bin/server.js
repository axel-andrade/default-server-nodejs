'use strict'

const app = require('../src/app');
const http = require ('http');
const debug = require('debug')('coachzac:server');

const port = normalizePort(process.env.PORT || '3000');
app.set('port',port);

const server = http.createServer(app);

//configurando o servidor para ficar ouvindo a porta
server.listen(port);
//Verificando errors servidor
server.on('error',onError);
//Iniciando o debug
server.on('listening',onListening);

//normalizando a porta 
function normalizePort(val){
    
    //convertendo valor para inteiro
    const port = parseInt(val,10);

    //se esse valor não for um número
    if(isNaN(port)){
        return val;
    }
    
    if(port>=0){
        return port;
    }

    return false;
}

//Gerenciado erros do servidor(função retirada do express)
function onError(error){
        if(error.syscall !== 'listen'){
            throw error;
        }

        const bind = typeof port === 'string'  ? 'Pipe' + port: 'Port' + port;

        switch(error.code){
            case 'EACCES':
                  console.error(bind + 'requires elevated privileges');
                  process.exit(1);
                  break;
            case 'EADDRINUSE':
                  console.error(bind+ ' is already in use');
                  process.exit(1);
            default: 
                  throw error;
        }

}

//Iniciando o debug
function onListening(){
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe' + addr : 'port' + addr.port;
    debug('Listening on' + bind);
}