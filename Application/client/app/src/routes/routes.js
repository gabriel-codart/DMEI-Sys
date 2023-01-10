import React from 'react';
import { Routes, Route } from 'react-router-dom';
import useAuth from '../contexts/useAuth.js';

import Login from '../pages/login/login.js';
//import Home from '../pages/home/home.js';
import Users from '../pages/users/read.js';
import CreateUser from '../pages/users/create.js';
import UpdateUser from '../pages/users/update.js';

const Private = ({ Item }) => {
    const { signed } = useAuth();
    return signed > 0 ? <Item/> : <Login/>;
};

export default function UserRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/users" element={<Private Item={Users}/>}/>
            <Route path="/users/create" element={<Private Item={CreateUser}/>}/>
            <Route path="/users/:id/update" element={<Private Item={UpdateUser}/>}/>
        </Routes>
    )
};
