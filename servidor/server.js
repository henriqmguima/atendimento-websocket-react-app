import { WebSocketServer, WebSocket } from 'ws';

const fila = [];
let contador = 1;

function gerarSenha() {
  return 'A' + String(contador++).padStart(3, '0');
}

const server = new WebSocketServer({ port: 8080 });

server.on('connection', (ws) => {
  console.log('Novo cliente conectado');

  ws.send(JSON.stringify({ tipo: 'filaAtualizada', fila }));

  ws.on('message', (data) => {
    console.log('Mensagem recebida:', data.toString()); 
    try {
      const msg = JSON.parse(data.toString());

      if (msg.tipo === 'registrarUsuario') {
        const novaSenha = gerarSenha();
        const novoItem = {
          senha: novaSenha,
          nome: msg.nome,
          cpf: msg.cpf,
          status: 'Aguardando',
        };
        fila.push(novoItem);
        broadcast({ tipo: 'filaAtualizada', fila });
      }

      else if (msg.tipo === 'atualizarStatus') {
        fila.forEach(item => {
          if (item.senha === msg.senha) {
            item.status = msg.novoStatus;
          }
        });
        broadcast({ tipo: 'filaAtualizada', fila });
      }

      else if (msg.tipo === 'removerSenha') {
        const index = fila.findIndex(item => item.senha === msg.senha);
        if (index !== -1) {
          fila.splice(index, 1);
          broadcast({ tipo: 'filaAtualizada', fila });
        }
      } else {
          console.warn('Tipo de mensagem desconhecido:', msg.tipo);
      }
    } catch (err) {
        console.error('Erro ao processar mensagem:', err.message);
        ws.send(JSON.stringify({ tipo: 'erro', mensagem: 'Mensagem inválida' }));
    }
  });

  ws.on('close', () => {
    console.log('Cliente desconectado');
  });

  ws.on('error', (err) => {
    console.error('Erro de conexão:', err.message);
  });
});

function broadcast(msgObj) {
  const msg = JSON.stringify(msgObj);
  server.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg);
    }
  });
}

console.log('Servidor WebSocket escutando na porta 8080');
