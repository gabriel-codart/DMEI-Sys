import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from '../pages/login/login.js';
//import Home from '../pages/home/home.js';
import Users from '../pages/users/users.js';
import CreateUser from '../pages/users/create.js';

export default function UserRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/users" element={<Users/>}/>
            <Route path="/create_user" element={<CreateUser/>}/>
        </Routes>
    )
};