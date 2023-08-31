import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import 'bootstrap/dist/css/bootstrap.css';


const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
 <React.StrictMode>
    <HashRouter>
       <AppRoutes />
    </HashRouter>
 </React.StrictMode>
);