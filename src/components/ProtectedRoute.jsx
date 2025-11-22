import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (user === undefined) {
    return <div className="text-white">Carregando...</div>;
  }

  return user ? children : <Navigate to="/login" />;
}
