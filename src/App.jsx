import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />

      {/*ROTAS*/}
      <Routes>
        <Route path="/" element={<Home />} />
    
      </Routes>
    </>
  );
}

export default App;
