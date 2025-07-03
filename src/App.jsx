import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PainelUsuario from './components/PainelUsuario';
import PainelAtendente from './components/PainelAtendente';
import Home from './pages/Home';
import { conectarSocket } from './services/socket'; // importa a função

function App() {
  useEffect(() => {
    // inicia a conexão WebSocket ao carregar o app
    conectarSocket(() => {}); // você pode passar um listener global, se quiser
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/usuario" element={<PainelUsuario />} />
        <Route path="/atendente" element={<PainelAtendente />} />
      </Routes>
    </Router>
  );
}

export default App;
