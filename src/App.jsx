import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import UserSetup from "./pages/UserSetup";
import MinhasContas from './pages/MinhasContas';

function App() {
  return (
    <>
      <Navbar />

      {/*ROTAS*/}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/UserSetup' element={<UserSetup />} />

      <Route path='/MinhasContas' element={<MinhasContas />} />

      </Routes>
    </>
  );
}

export default App;
