import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import NavBar from './components/Navbar';
import ListLuxuryDress from './components/ListLuxuryDress';
import ListStandard from './components/ListStandard';
import ListVip from './components/ListVip';
import Contract from './components/Contract';
import Footer from './components/Footer';
import Login from './components/Login';
import CreateContract from './components/CreateContract';
import CreateCustomer from './components/CreateCustomer';
import Header from './components/Header';
import Register from './components/Register';
import Vest from './components/Vest';
import Payment from './components/Payment';
import Home from './components/Home';
import Anime404 from './js/anime';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className='row'>
        <div className='col-3'>
          <NavBar />
        </div>
        <div className='col-9'>
          <Header />
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/luxury' element={<ListLuxuryDress />}></Route>
            <Route path='/standard' element={<ListStandard />}></Route>
            <Route path='/vip' element={<ListVip />}></Route>
            <Route path='/contract' element={<Contract />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/create-contract' element={<CreateContract />}></Route>
            <Route path='/create-customer/:phone' element={<CreateCustomer />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/vest' element={<Vest />}></Route>
            <Route path='/return-payment' element={<Payment />}></Route>
            <Route path='/404' element={<Anime404 />}></Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
