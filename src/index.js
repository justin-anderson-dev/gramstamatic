/* eslint-disable prettier/prettier */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import FirebaseContext from './context/firebase';
import { firebase, FieldValue } from './lib/firebase';

ReactDOM.render(
  <FirebaseContext.Provider value={{ firebase, FieldValue }}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root')
);

// client side rendered app: react (cra)
  // -> database (Firebase)
  // -> react-loading-skeleton
  // -> tailwind

// src
  // -> components
  // -> constants
  // -> context
  // -> helpers
  // -> hooks
  // -> lib (firebase here)
  // -> services (firebase functions here)
  // -> styles (tailwind folder: app / tailwind)
