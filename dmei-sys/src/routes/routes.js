import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from '../pages/login/login.js';
import Home from '../pages/home/home.js';

export default function UserRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/home" element={<Home/>}/>
        </Routes>
    )
};