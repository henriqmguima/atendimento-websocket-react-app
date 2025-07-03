import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PainelUsuario from './components/PainelUsuario';
import PainelAtendente from './components/PainelAtendente';
import Home from './pages/Home';
import { conectarSocket } from './services/socket';

function App() {
  useEffect(() => {
    conectarSocket(() => {}); 
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
