let socket;
let conectado = false;
let listeners = [];

function conectarSocket(onMessage) {
  if (socket && conectado) {
    listeners.push(onMessage);
    return;
  }

  socket = new WebSocket('ws://localhost:8080');

  socket.onopen = () => {
    conectado = true;
    console.log('✅ WebSocket conectado');
  };

  socket.onmessage = (event) => {
    try {
      const msg = JSON.parse(event.data);
      listeners.forEach((fn) => fn(msg));
    } catch (e) {
      console.error('❌ Erro ao processar mensagem:', e);
    }
  };

  socket.onclose = () => {
    conectado = false;
    console.warn('🔌 WebSocket desconectado');
  };

  socket.onerror = (error) => {
    console.error('🚨 Erro WebSocket:', error);
  };

  listeners.push(onMessage);
}

function enviar(msg) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(msg));
  } else {
    console.warn('⚠️ WebSocket não está pronto.');
  }
}

export { conectarSocket, enviar };
