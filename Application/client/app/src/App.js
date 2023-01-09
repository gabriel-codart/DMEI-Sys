import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import UserRoutes from './routes/routes.js';
import NavBar from './components/navbar/navbar.js';
import Footer from './components/footer/footer.js';
import SideMenu from './components/side-menu/side-menu.js';

export default function App() {
  return (
    <BrowserRouter>

      <NavBar/>

      <div style={{display:'flex'}}>
        <SideMenu/>
        <UserRoutes/>
      </div>

      <Footer/>

    </BrowserRouter>
  );
};
