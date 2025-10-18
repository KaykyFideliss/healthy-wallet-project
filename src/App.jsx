import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import UserSetup from "./pages/UserSetup";


function App() {
  return (
    <>
      <Navbar />

      {/*ROTAS*/}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/UserSetup' element={<UserSetup />} />

    
      </Routes>
    </>
  );
}

export default App;
