import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import UserRoutes from './routes/routes.js';
import NavBar from './components/navbar/navbar.js';
import Footer from './components/footer/footer.js';

export default function App() {
  return (
    <BrowserRouter>

      <NavBar/>

      <UserRoutes/>

      <Footer/>

    </BrowserRouter>
  );
};
