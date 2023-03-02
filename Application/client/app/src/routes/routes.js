import React from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../contexts/useAuth.js';

import Login from '../pages/login/login.js';

import Dashboard from '../pages/logged/dashboard/dashboard.js';
import Records from '../pages/logged/records/read.js';

import Users from '../pages/logged/users/read.js';
import CreateUser from '../pages/logged/users/create.js';
import UpdateUser from '../pages/logged/users/update.js';
import User from '../pages/logged/users/user.js';

import Entities from '../pages/logged/entities/read.js';
import CreateEntity from '../pages/logged/entities/create.js';
import UpdateEntity from '../pages/logged/entities/update.js';
import Entity from '../pages/logged/entities/entity.js';

import Machines from '../pages/logged/machines/read.js';
import CreateMachine from '../pages/logged/machines/create.js';
import UpdateMachine from '../pages/logged/machines/update.js';
import Machine from '../pages/logged/machines/machine.js';
import MachineDeactivateDOC from '../pages/logged/machines/deactivate/report.js';
import MachineDeactivateMenu from '../pages/logged/machines/deactivate/menu.js';
import MachineDeactivateFinalize from '../pages/logged/machines/deactivate/finalize.js';

import Internals from '../pages/logged/internals/read.js';
import CreateInternal from '../pages/logged/internals/create.js';
import UpdateInternal from '../pages/logged/internals/update.js';
import Internal from '../pages/logged/internals/internal.js';

import Externals from '../pages/logged/externals/read.js';
import CreateExternal from '../pages/logged/externals/create.js';
import UpdateExternal from '../pages/logged/externals/update.js';
import External from '../pages/logged/externals/external.js';
import ExternalReport from '../pages/logged/externals/doc_generate/report.js';

import Inputs from '../pages/logged/input/read.js';
import CreateInput from '../pages/logged/input/create.js';
import UpdateInput from '../pages/logged/input/update.js';
import Input from '../pages/logged/input/input.js';
import InputsTerminateds from '../pages/logged/input/terminateds.js';
import TerminateInput from '../pages/logged/input/terminate.js';
import InputGenerateEntry from '../pages/logged/input/doc_generate/entry.js';

import AnonExternals from '../pages/anonymous/externals/read.js';
import AnonExternal from '../pages/anonymous/externals/external.js';
import InputGenerateExit from '../pages/logged/input/doc_generate/exit.js';


const Private = ({ Logged, Anonymous }) => {
    const { signed } = useAuth();
    const location = useLocation().pathname;
    const navigate = useNavigate();

    if (signed) {
        switch (signed.type) {
            case 1:
                if (location.slice(0,6) === '/anon/') return navigate('/dashboard');
                else return <Logged/>;
            case 2:
                if (location.slice(0,6) === '/anon/') return <Anonymous/>;
                else return navigate('/anon/dashboard');
            default:
                break;
        }
    } else {
        const userSaved = JSON.parse(localStorage.getItem("user"))
        if(!userSaved === true) return <Login/>
    }
};

export default function UserRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login/>}/>

            <Route path="/dashboard" element={<Private Logged={Dashboard}/>}/>
            
            <Route path="/users" element={<Private Logged={Users}/>}/>
            <Route path="/users/create" element={<Private Logged={CreateUser}/>}/>
            <Route path="/users/:id/update" element={<Private Logged={UpdateUser}/>}/>
            <Route path="/users/:id" element={<Private Logged={User}/>}/>

            <Route path="/entities" element={<Private Logged={Entities}/>}/>
            <Route path="/entities/create" element={<Private Logged={CreateEntity}/>}/>
            <Route path="/entities/:id/update" element={<Private Logged={UpdateEntity}/>}/>
            <Route path="/entities/:id" element={<Private Logged={Entity}/>}/>

            <Route path="/machines" element={<Private Logged={Machines}/>}/>
            <Route path="/machines/create" element={<Private Logged={CreateMachine}/>}/>
            <Route path="/machines/:id/update" element={<Private Logged={UpdateMachine}/>}/>
            <Route path="/machines/:id" element={<Private Logged={Machine}/>}/>
            <Route path="/machines/:id/deactivate/" element={<Private Logged={MachineDeactivateMenu}/>}/>
            <Route path="/machines/:id/deactivate/doc" element={<Private Logged={MachineDeactivateDOC}/>}/>
            <Route path="/machines/:id/deactivate/finalize" element={<Private Logged={MachineDeactivateFinalize}/>}/>
            <Route path="/machines/records" element={<Private Logged={Records}/>}/>

            <Route path="/internals" element={<Private Logged={Internals}/>}/>
            <Route path="/internals/create" element={<Private Logged={CreateInternal}/>}/>
            <Route path="/internals/:id/update" element={<Private Logged={UpdateInternal}/>}/>
            <Route path="/internals/:id" element={<Private Logged={Internal}/>}/>

            <Route path="/externals" element={<Private Logged={Externals}/>}/>
            <Route path="/externals/create" element={<Private Logged={CreateExternal}/>}/>
            <Route path="/externals/:id/update" element={<Private Logged={UpdateExternal}/>}/>
            <Route path="/externals/:id" element={<Private Logged={External}/>}/>
            <Route path="/externals/:id/report" element={<Private Logged={ExternalReport}/>}/>

            <Route path="/inputs" element={<Private Logged={Inputs}/>}/>
            <Route path="/inputs/create" element={<Private Logged={CreateInput}/>}/>
            <Route path="/inputs/:id/update" element={<Private Logged={UpdateInput}/>}/>
            <Route path="/inputs/:id" element={<Private Logged={Input}/>}/>
            <Route path="/inputs/:id/entry" element={<Private Logged={InputGenerateEntry}/>}/>
            <Route path="/inputs/:id/exit" element={<Private Logged={InputGenerateExit}/>}/>

            <Route path="/inputs/terminate" element={<Private Logged={TerminateInput}/>}/>
            <Route path="/inputs/terminateds" element={<Private Logged={InputsTerminateds}/>}/>
            <Route path="/inputs/terminateds/:id/update" element={<Private Logged={UpdateInput}/>}/>
            <Route path="/inputs/terminateds/:id" element={<Private Logged={Input}/>}/>
            <Route path="/inputs/terminateds/:id/entry" element={<Private Logged={InputGenerateEntry}/>}/>
            <Route path="/inputs/terminateds/:id/exit" element={<Private Logged={InputGenerateExit}/>}/>

            <Route path="/anon/externals" element={<Private Anonymous={AnonExternals}/>}/>
            <Route path="/anon/externals/:id" element={<Private Anonymous={AnonExternal}/>}/>
            <Route path="/anon/dashboard" element={<Private Anonymous={Dashboard}/>}/>
            
        </Routes>
    )
};
