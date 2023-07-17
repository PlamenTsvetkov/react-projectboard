import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Footer from './components/Footer/Footer';
import { Account } from './components/Account/Account';
import Home from './components/Home/Home';
import ChangePassword from './components/ChangePassword/ChangePassword';
import EventMonitor from './components/EventMonitor/EventMonitor';
import isAuth from './hoc/isAuth';
import Details from './components/Details/Details';
import './App.css';

function App() {
  return (
    <Account>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />

        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/login" Component={Login} />
            <Route path="/register" Component={Register} />
            <Route path="/" Component={Home} />
            <Route path="/changepassword" Component={isAuth(ChangePassword)} />
            <Route path="/eventmonitor" Component={isAuth(EventMonitor)} />
            <Route path="/games/:gameId" Component={Details} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Account>
  );
}

export default App;
