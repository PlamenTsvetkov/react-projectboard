import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Footer from './components/Footer/Footer';
import { Account } from './components/Account/Account';
import Home from './components/Home/Home';
import ChangePassword from './components/ChangePassword/ChangePassword';
import isAuth from './hoc/isAuth';
import './App.css';

function App() {

  return (
    <Account >
      <Header />

      <Routes>
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route path="/" Component={Home} />
        <Route path="/changepassword" Component={isAuth(ChangePassword)} />
      </Routes>

      <Footer />
    </Account>
  );
}

export default App;
