import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img
          src="/logo.png" // Substitua pelo caminho correto
          alt="Logo"
          style={styles.logo}
        />
        <h1 style={styles.title}>Sistema de Atendimento</h1>
        <p style={styles.subtitle}>Escolha uma opção para continuar:</p>
        <div style={styles.buttonGroup}>
          <button
            style={{ ...styles.button, backgroundColor: '#102EE0' }}
            onClick={() => navigate('/atendente')}
          >
            Painel do Atendente
          </button>
          <button
            style={{ ...styles.button, backgroundColor: '#0EAA00' }}
            onClick={() => navigate('/usuario')}
          >
            Painel do Usuário
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh', // ocupa toda a tela
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '40px 30px',
    maxWidth: '400px',
    width: '90%',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
  },
  logo: {
    width: '100px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '28px',
    margin: '10px 0',
    color: '#102EE0',
  },
  subtitle: {
    fontSize: '16px',
    marginBottom: '30px',
    color: '#444',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  button: {
    padding: '12px 20px',
    fontSize: '16px',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'transform 0.2s ease-in-out',
  },
};

export default Home;
