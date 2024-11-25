import { useState } from 'react';
import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg'
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loader from './components/Loader';
import Register from './page/Register';
import Login from './page/Login';
import Dashboard from './page/Dashboard';


function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route index element={<Register />} />
            <Route path='/' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Routes>
        </Suspense>
      </Router>

      {/* <Register /> */}
    </>
  );
}

export default App;
