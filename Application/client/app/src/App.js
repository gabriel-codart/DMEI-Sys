import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import UserRoutes from './routes/routes.js';
import SideMenu from './components/side-menu/side-menu.js';
import { AuthProvider } from './contexts/auth.js';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>

      <div style={{
          display:'flex',
          height:'100%'
        }}>
        <SideMenu/>
        <UserRoutes/>
      </div>

      </BrowserRouter>
    </AuthProvider>
  );
};
