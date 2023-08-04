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
import NotFounded from '../components/not_founded/not_founded.js';


const Private = ({ Logged, Anonymous }) => {
    const { signed } = useAuth();
    const location = useLocation().pathname;
    const navigate = useNavigate();

    if (signed) {
        switch (signed.type) {
            case 1: case 2: // Usuário ADM ou Comum
                if (location.slice(0,15) === `/dmei-sys/anon/`) return navigate(`/dmei-sys/dashboard`);
                else return <Logged/>;
            case 3: // Usuário Anônimo
                if (location.slice(0,15) === `/dmei-sys/anon/`) return <Anonymous/>;
                else return navigate(`/dmei-sys/anon/dashboard`);
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
        <Routes basename='/dmei-sys'>
            <Route path="*" element={<NotFounded/>}/>
            
            <Route path="/dmei-sys" element={<Login/>}/>

            <Route path="/dmei-sys/dashboard" element={<Private Logged={Dashboard}/>}/>
            
            <Route path="/dmei-sys/users" element={<Private Logged={Users}/>}/>
            <Route path="/dmei-sys/users/create" element={<Private Logged={CreateUser}/>}/>
            <Route path="/dmei-sys/users/:id/update" element={<Private Logged={UpdateUser}/>}/>
            <Route path="/dmei-sys/users/:id" element={<Private Logged={User}/>}/>

            <Route path="/dmei-sys/entities" element={<Private Logged={Entities}/>}/>
            <Route path="/dmei-sys/entities/create" element={<Private Logged={CreateEntity}/>}/>
            <Route path="/dmei-sys/entities/:id/update" element={<Private Logged={UpdateEntity}/>}/>
            <Route path="/dmei-sys/entities/:id" element={<Private Logged={Entity}/>}/>

            <Route path="/dmei-sys/machines" element={<Private Logged={Machines}/>}/>
            <Route path="/dmei-sys/machines/create" element={<Private Logged={CreateMachine}/>}/>
            <Route path="/dmei-sys/machines/:id/update" element={<Private Logged={UpdateMachine}/>}/>
            <Route path="/dmei-sys/machines/:id" element={<Private Logged={Machine}/>}/>
            <Route path="/dmei-sys/machines/:id/deactivate/" element={<Private Logged={MachineDeactivateMenu}/>}/>
            <Route path="/dmei-sys/machines/:id/deactivate/doc" element={<Private Logged={MachineDeactivateDOC}/>}/>
            <Route path="/dmei-sys/machines/:id/deactivate/finalize" element={<Private Logged={MachineDeactivateFinalize}/>}/>
            <Route path="/dmei-sys/machines/records" element={<Private Logged={Records}/>}/>

            <Route path="/dmei-sys/internals" element={<Private Logged={Internals}/>}/>
            <Route path="/dmei-sys/internals/create" element={<Private Logged={CreateInternal}/>}/>
            <Route path="/dmei-sys/internals/:id/update" element={<Private Logged={UpdateInternal}/>}/>
            <Route path="/dmei-sys/internals/:id" element={<Private Logged={Internal}/>}/>

            <Route path="/dmei-sys/externals" element={<Private Logged={Externals}/>}/>
            <Route path="/dmei-sys/externals/create" element={<Private Logged={CreateExternal}/>}/>
            <Route path="/dmei-sys/externals/:id/update" element={<Private Logged={UpdateExternal}/>}/>
            <Route path="/dmei-sys/externals/:id" element={<Private Logged={External}/>}/>
            <Route path="/dmei-sys/externals/:id/report" element={<Private Logged={ExternalReport}/>}/>

            <Route path="/dmei-sys/inputs" element={<Private Logged={Inputs}/>}/>
            <Route path="/dmei-sys/inputs/create" element={<Private Logged={CreateInput}/>}/>
            <Route path="/dmei-sys/inputs/:id/update" element={<Private Logged={UpdateInput}/>}/>
            <Route path="/dmei-sys/inputs/:id" element={<Private Logged={Input}/>}/>
            <Route path="/dmei-sys/inputs/:id/entry" element={<Private Logged={InputGenerateEntry}/>}/>
            <Route path="/dmei-sys/inputs/:id/exit" element={<Private Logged={InputGenerateExit}/>}/>

            <Route path="/dmei-sys/inputs/terminate" element={<Private Logged={TerminateInput}/>}/>
            <Route path="/dmei-sys/inputs/terminateds" element={<Private Logged={InputsTerminateds}/>}/>
            <Route path="/dmei-sys/inputs/terminateds/:id/update" element={<Private Logged={UpdateInput}/>}/>
            <Route path="/dmei-sys/inputs/terminateds/:id" element={<Private Logged={Input}/>}/>
            <Route path="/dmei-sys/inputs/terminateds/:id/entry" element={<Private Logged={InputGenerateEntry}/>}/>
            <Route path="/dmei-sys/inputs/terminateds/:id/exit" element={<Private Logged={InputGenerateExit}/>}/>

            <Route path="/dmei-sys/anon/externals" element={<Private Anonymous={AnonExternals}/>}/>
            <Route path="/dmei-sys/anon/externals/:id" element={<Private Anonymous={AnonExternal}/>}/>
            <Route path="/dmei-sys/anon/dashboard" element={<Private Anonymous={Dashboard}/>}/>
            
        </Routes>
    )
};
