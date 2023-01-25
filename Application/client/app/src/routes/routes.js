import React from 'react';
import { Routes, Route } from 'react-router-dom';
import useAuth from '../contexts/useAuth.js';

import Login from '../pages/login/login.js';

import Dashboard from '../pages/dashboard/dashboard.js';
import Records from '../pages/records/read.js';

import Users from '../pages/users/read.js';
import CreateUser from '../pages/users/create.js';
import UpdateUser from '../pages/users/update.js';
import User from '../pages/users/user.js';

import Entities from '../pages/entities/read.js';
import CreateEntity from '../pages/entities/create.js';
import UpdateEntity from '../pages/entities/update.js';
import Entity from '../pages/entities/entity.js';

import Machines from '../pages/machines/read.js';
import CreateMachine from '../pages/machines/create.js';
import UpdateMachine from '../pages/machines/update.js';
import Machine from '../pages/machines/machine.js';

import Internals from '../pages/internals/read.js';
import CreateInternal from '../pages/internals/create.js';
import UpdateInternal from '../pages/internals/update.js';
import Internal from '../pages/internals/internal.js';

const Private = ({ Item }) => {
    const { signed } = useAuth();
    return signed > 0 ? <Item/> : <Login/>;
};

export default function UserRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login/>}/>

            <Route path="/dashboard" element={<Private Item={Dashboard}/>}/>
            <Route path="/records" element={<Private Item={Records}/>}/>

            <Route path="/users" element={<Private Item={Users}/>}/>
            <Route path="/users/create" element={<Private Item={CreateUser}/>}/>
            <Route path="/users/:id/update" element={<Private Item={UpdateUser}/>}/>
            <Route path="/users/:id" element={<Private Item={User}/>}/>

            <Route path="/entities" element={<Private Item={Entities}/>}/>
            <Route path="/entities/create" element={<Private Item={CreateEntity}/>}/>
            <Route path="/entities/:id/update" element={<Private Item={UpdateEntity}/>}/>
            <Route path="/entities/:id" element={<Private Item={Entity}/>}/>

            <Route path="/machines" element={<Private Item={Machines}/>}/>
            <Route path="/machines/create" element={<Private Item={CreateMachine}/>}/>
            <Route path="/machines/:id/update" element={<Private Item={UpdateMachine}/>}/>
            <Route path="/machines/:id" element={<Private Item={Machine}/>}/>

            <Route path="/internals" element={<Private Item={Internals}/>}/>
            <Route path="/internals/create" element={<Private Item={CreateInternal}/>}/>
            <Route path="/internals/:id/update" element={<Private Item={UpdateInternal}/>}/>
            <Route path="/internals/:id" element={<Private Item={Internal}/>}/>
        </Routes>
    )
};
