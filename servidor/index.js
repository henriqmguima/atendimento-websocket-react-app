const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

let fila = [];
let contador = 1;

function gerarSenha() {
  return 'A' + String(contador++).padStart(3, '0');
}

io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id);

  socket.emit('filaAtualizada', fila);

  socket.on('registrarUsuario', ({ nome, cpf }) => {
    const novaSenha = gerarSenha();
    const novoItem = {
      senha: novaSenha,
      nome,
      cpf,
      status: 'Aguardando'
    };
    fila.push(novoItem);
    io.emit('filaAtualizada', fila);
  });

  socket.on('atualizarStatus', ({ senha, novoStatus }) => {
    fila = fila.map(item => item.senha === senha ? { ...item, status: novoStatus } : item);
    io.emit('filaAtualizada', fila);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

server.listen(3001, () => {
  console.log('Servidor WebSocket rodando na porta 3001');
});
