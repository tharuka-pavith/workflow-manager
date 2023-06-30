import React from 'react';
import App from './App'; //from App.js

import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client';


const container = document.getElementById('root'); //get HTML Element ID
const root = createRoot(container); //create the root

//Render the content
root.render(
  <React.StrictMode> {/*Strict mode enables any checks or warnings.(only in development mode)*/}
     <BrowserRouter> {/**Recommended router for the projects*/}
       <App />
     </BrowserRouter>
   </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

