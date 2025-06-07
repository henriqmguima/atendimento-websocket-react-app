import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PainelUsuario from './components/PainelUsuario';
import PainelAtendente from './components/PainelAtendente';
import Home from './pages/Home'; // <-- novo

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Agora exibe a tela inicial */}
        <Route path="/usuario" element={<PainelUsuario />} />
        <Route path="/atendente" element={<PainelAtendente />} />
      </Routes>
    </Router>
  );
}

export default App;
