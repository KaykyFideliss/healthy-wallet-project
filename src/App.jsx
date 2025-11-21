import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import UserSetup from "./pages/UserSetup";
import MinhasContas from './pages/MinhasContas';
import Login from './pages/login';
import Cadastro from './pages/Cadastro';
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <GoogleOAuthProvider clientId="16111024494-4ce3in6cah7hic3eoma1ml12evv6h2pe.apps.googleusercontent.com">
      <>
        <Navbar />

        {/* ROTAS */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/UserSetup" element={<UserSetup />} />
          <Route path="/MinhasContas" element={<MinhasContas />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Cadastro" element={<Cadastro />} />
        </Routes>
      </>
    </GoogleOAuthProvider>
  );
}

export default App;
