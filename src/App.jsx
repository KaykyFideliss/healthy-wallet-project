import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/login";
import Cadastro from "./pages/Cadastro";
import UserSetup from "./pages/UserSetup";
import MinhasContas from "./pages/MinhasContas";
import { AuthProvider, useAuth } from "./context/AuthContext";
import UserSettings from "./pages/UserSettings";
import Dashboard from "./pages/Dashboard";
import TabelaDashboard from "./pages/TabelaDashboard";
import AuthCallback from "./auth/Callback";
import GuiaDeUso from "./pages/GuiaDeUso";

import Footer from "./components/Footer.jsx";

// 🔐 Rota protegida
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (user === undefined) {
    return (
      <div className="text-white text-center pt-10 text-lg font-zalando ">
        Carregando...
      </div>
    );
  }

  return user ? children : <Navigate to="/Login" />;
};

function App() {
  return (
    <AuthProvider>
      
      <Navbar />

      <Routes>
        {/* Páginas públicas */}
        <Route path="/" element={<Home />}  className="overflow-x-hidden" />
        <Route path="/Login" element={<Login />} />
        <Route path="/Cadastro" element={<Cadastro />} />
        <Route path="/GuiaDeUso" element={<GuiaDeUso />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tabela/:id" element={<TabelaDashboard />} />
        {/* Páginas que exigem login */}
        <Route
          path="/UserSetup"
          element={
            <ProtectedRoute>
              <UserSetup />
            </ProtectedRoute>
          }
        />

        <Route path="/Settings" element={
          <ProtectedRoute>
            <UserSettings />
          </ProtectedRoute>
        } />


        <Route
          path="/MinhasContas"
          element={
            <ProtectedRoute>
              <MinhasContas />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>

            </ProtectedRoute>
          }
        />

<Route path="/auth/callback" element={<AuthCallback />} />



        {/* Redirecionamento para rota padrão */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

    
      <Footer />

    </AuthProvider>

    
  );
}

export default App;
