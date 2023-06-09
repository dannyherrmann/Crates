import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Crates } from './components/Crates';
import { BrowserRouter } from 'react-router-dom';
import firebase from "firebase/compat/app";
import { FirebaseConfig, firebaseConfig } from "./FirebaseConfig";

firebase.initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Crates />
  </BrowserRouter>
)
