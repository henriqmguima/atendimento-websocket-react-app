import { useEffect, useState } from 'react';
import socket from '../services/socket';

function PainelUsuario() {
  const [chamando, setChamando] = useState(null);

  useEffect(() => {
    socket.on('filaAtualizada', (fila) => {
      const emChamada = fila.find(item => item.status === 'Chamando');
      setChamando(emChamada || null);
    });

    return () => {
      socket.off('filaAtualizada');
    };
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Painel do Usuário</h2>
        {chamando ? (
          <div style={styles.callBox}>
            <h3 style={styles.name}>Chamando {chamando.nome}</h3>
            <p style={styles.senha}>Senha: {chamando.senha}</p>
          </div>
        ) : (
          <p style={styles.noCall}>Nenhuma senha está sendo chamada no momento</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  card: {
    background: '#fff',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
    textAlign: 'center',
    maxWidth: '500px',
    width: '100%',
  },
  title: {
    color: '#0EAA00',
    fontSize: '28px',
    marginBottom: '30px',
  },
  callBox: {
    backgroundColor: '#102EE0',
    padding: '20px',
    borderRadius: '12px',
  },
  name: {
    fontSize: '24px',
    color: '#fff',
    marginBottom: '10px',
  },
  senha: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  noCall: {
    fontSize: '16px',
    color: '#555',
  },
};

export default PainelUsuario;
