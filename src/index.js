import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Components/App';
import { BrowserRouter } from 'react-router-dom';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9tgcnopFpgjQLTuwRlHHo4BsRgQRvEdA",
  authDomain: "sweetvictory-ae92f.firebaseapp.com",
  databaseURL: "https://sweetvictory-ae92f-default-rtdb.firebaseio.com",
  projectId: "sweetvictory-ae92f",
  storageBucket: "sweetvictory-ae92f.appspot.com",
  messagingSenderId: "799642355759",
  appId: "1:799642355759:web:54fb065f349d1697a0deda",
  measurementId: "G-0N73L76BBP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
        <App />
  </BrowserRouter>
);


