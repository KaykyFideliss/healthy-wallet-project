import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="16111024494-4ce3in6cah7hic3eoma1ml12evv6h2pe.apps.googleusercontent.com">
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
