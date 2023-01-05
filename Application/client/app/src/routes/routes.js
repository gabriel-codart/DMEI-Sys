import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from '../pages/login/login.js';
//import Home from '../pages/home/home.js';
import Users from '../pages/users/read.js';
import CreateUser from '../pages/users/create.js';

export default function UserRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/users" element={<Users/>}/>
            <Route path="/users/create" element={<CreateUser/>}/>
        </Routes>
    )
};