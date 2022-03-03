import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WalletPage from './components/routes/WalletPage';
import Credit from './components/routes/Credit';
import Debit from './components/routes/Debit';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/wallet" element={<WalletPage />} >
        <Route path=":walletId" element={<WalletPage />} />
      </Route>
      <Route path="/credit" element={<Credit />} >
        <Route path=":walletId" element={<Credit />} />
      </Route>
      <Route path="/debit" element={<Debit />}>
        <Route path=":walletId" element={<Debit />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
