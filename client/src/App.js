import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import Register from './pages/Register';
import Login from './pages/Login'
import Home from './pages/Home';
import { NEOTracker } from './pages/APOD';
import { Fact_wizard } from './pages/World_watch copy';
import { MarsExploration } from './pages/World_watch';

function App() {
  return (
    <>

      <AuthProvider>
        <Routes>
          <Route path='/' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/APOD' element={<NEOTracker/>} />
          <Route path='/fact_wizard' element={<Fact_wizard/>} />
          <Route path='/mars-exploration' element={<MarsExploration/>} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
