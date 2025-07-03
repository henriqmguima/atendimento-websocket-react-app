import { useEffect, useState } from 'react';
import { conectarSocket, enviar } from '../services/socket';

function PainelAtendente() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [fila, setFila] = useState([]);

  useEffect(() => {
    conectarSocket((msg) => {
      if (msg.tipo === 'filaAtualizada') {
        setFila(msg.fila);
      }
    });
  }, []);

  const registrarUsuario = () => {
    if (!nome || !cpf) {
      alert('Preencha nome e CPF!');
      return;
    }

    const cpfLimpo = cpf.replace(/\D/g, '');
    if (cpfLimpo.length !== 11) {
      alert('CPF deve conter exatamente 11 dígitos!');
      return;
    }

    enviar({
      tipo: 'registrarUsuario',
      nome,
      cpf: cpfLimpo,
    });

    setNome('');
    setCpf('');
  };

  const atualizarStatus = (senha, novoStatus) => {
    enviar({
      tipo: 'atualizarStatus',
      senha,
      novoStatus,
    });
  };

  const removerSenha = (senha) => {
    if (window.confirm('Deseja remover esta senha da fila?')) {
      enviar({
        tipo: 'removerSenha',
        senha,
      });
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Painel do Atendente</h2>

        <div style={styles.form}>
          <input
            style={styles.input}
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            style={styles.input}
            placeholder="CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
          <button style={styles.registerButton} onClick={registrarUsuario}>
            Registrar Usuário
          </button>
        </div>

        <table style={styles.table}>
          <thead>
            <tr>
              <th>Senha</th>
              <th>Nome</th>
              <th>CPF</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {fila.map((item, index) => (
              <tr
                key={index}
                style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' }}
              >
                <td>{item.senha}</td>
                <td>{item.nome}</td>
                <td>{item.cpf}</td>
                <td>{item.status}</td>
                <td>
                  {item.status === 'Aguardando' && !fila.some(s => s.status === 'Chamando') && (
                    <button
                      style={styles.callButton}
                      onClick={() => atualizarStatus(item.senha, 'Chamando')}
                    >
                      Chamar
                    </button>
                  )}

                  {item.status === 'Chamando' && (
                    <>
                      <button
                        style={styles.attendedButton}
                        onClick={() => atualizarStatus(item.senha, 'Atendido')}
                      >
                        Atendido
                      </button>
                      <button
                        style={styles.missedButton}
                        onClick={() => atualizarStatus(item.senha, 'Não Respondeu')}
                      >
                        Não respondeu
                      </button>
                    </>
                  )}
                  <button
                    style={styles.removeButton}
                    onClick={() => removerSenha(item.senha)}
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    padding: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'start',
  },
  card: {
    background: '#fff',
    borderRadius: '16px',
    padding: '30px',
    width: '100%',
    maxWidth: '1000px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
  },
  title: {
    color: '#102EE0',
    fontSize: '28px',
    marginBottom: '20px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    flexWrap: 'wrap',
  },
  input: {
    flex: '1',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
  },
  registerButton: {
    padding: '10px 20px',
    backgroundColor: '#0EAA00',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px',
  },
  callButton: {
    backgroundColor: '#102EE0',
    color: '#fff',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginRight: '5px',
  },
  attendedButton: {
    backgroundColor: '#0EAA00',
    color: '#fff',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '6px',
    marginRight: '5px',
    cursor: 'pointer',
  },
  missedButton: {
    backgroundColor: '#f44336',
    color: '#fff',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  removeButton: {
    backgroundColor: '#777',
    color: '#fff',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '6px',
    marginLeft: '5px',
    cursor: 'pointer',
  },
};

export default PainelAtendente;
