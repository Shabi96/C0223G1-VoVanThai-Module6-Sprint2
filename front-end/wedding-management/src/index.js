import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Navbar from './components/Navbar';
import Login from './components/Login';
import ListDress from './components/ListLuxuryDress';
import Footer from './components/Footer';
import ListStandardDress from './components/ListStandardDress';
import ListVipDress from './components/ListVipDress';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className='row'>
        <div className='col-3'>
          <Navbar />
        </div>
        <div className='col-9'>
          <Routes>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/listLuxury' element={<ListDress />}></Route>
            <Route path='/listStandard' element={<ListStandardDress />}></Route>
            <Route path='/listVip' element={<ListVipDress />}></Route>
          </Routes>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
