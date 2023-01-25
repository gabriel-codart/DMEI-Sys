import React from 'react';
import { Sidebar, Menu, SubMenu, MenuItem } from 'react-pro-sidebar';
import { AiFillLayout } from 'react-icons/ai';
import { BsCpuFill } from 'react-icons/bs';
import { VscServerEnvironment, VscServer, VscServerProcess } from 'react-icons/vsc';
import { MdAddBox, MdLogout } from 'react-icons/md';
import { RiHistoryLine } from 'react-icons/ri';
import { FaUsers, FaBuilding, FaListUl } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import useAuth from '../../contexts/useAuth';

import './side-menu.css';

export default function SideMenu() {
    const { signed, signout } = useAuth();

    const navigate = useNavigate();

    const logout = () => {
        signout();
    };

    return (
        <div>
            {signed ? (
            <div className='side-menu'>
                <Sidebar className='side-bar'>
                    <Menu transitionDuration={1000}>
                        <h1 className='title'>DMEIsys</h1>
                        <hr/>

                        <MenuItem
                            icon={<AiFillLayout />}
                            onClick={()=>{navigate('/dashboard')}}>
                            Dashboard
                        </MenuItem>
                        <MenuItem
                            icon={<RiHistoryLine />}
                            onClick={()=>{navigate('/records')}}>
                            Registros
                        </MenuItem>

                        <hr/>
                        <SubMenu label="Entradas" icon={<VscServer />}>
                            <MenuItem
                                icon={<FaListUl />}
                                onClick={()=>{navigate('/machines')}}>
                                Listar
                            </MenuItem>
                            <MenuItem
                                icon={<MdAddBox />}
                                onClick={()=>{navigate('/machines/create')}}>
                                Adicionar
                            </MenuItem>
                        </SubMenu>

                        <SubMenu label="Externos" icon={<VscServerEnvironment />}>
                            <MenuItem
                                icon={<FaListUl />}
                                onClick={()=>{navigate('/entities')}}>
                                Listar
                            </MenuItem>
                            <MenuItem
                                icon={<MdAddBox />}
                                onClick={()=>{navigate('/entities/create')}}>
                                Adicionar
                            </MenuItem>
                        </SubMenu>

                        <SubMenu label="Internos" icon={<VscServerProcess />}>
                            <MenuItem
                                icon={<FaListUl />}
                                onClick={()=>{navigate('/internals')}}>
                                Listar
                            </MenuItem>
                            <MenuItem
                                icon={<MdAddBox />}
                                onClick={()=>{navigate('/internals/create')}}>
                                Adicionar
                            </MenuItem>
                        </SubMenu>

                        <hr/>

                        <SubMenu label="Máquinas" icon={<BsCpuFill />}>
                            <MenuItem
                                icon={<FaListUl />}
                                onClick={()=>{navigate('/machines')}}>
                                Listar
                            </MenuItem>
                            <MenuItem
                                icon={<MdAddBox />}
                                onClick={()=>{navigate('/machines/create')}}>
                                Adicionar
                            </MenuItem>
                        </SubMenu>

                        <SubMenu label="Entidades" icon={<FaBuilding />}>
                            <MenuItem
                                icon={<FaListUl />}
                                onClick={()=>{navigate('/entities')}}>
                                Listar
                            </MenuItem>
                            <MenuItem
                                icon={<MdAddBox />}
                                onClick={()=>{navigate('/entities/create')}}>
                                Adicionar
                            </MenuItem>
                        </SubMenu>

                        <SubMenu label="Usuários" icon={<FaUsers />}>
                            <MenuItem
                                icon={<FaListUl />}
                                onClick={()=>{navigate('/users')}}>
                                Listar
                            </MenuItem>
                            <MenuItem
                                icon={<MdAddBox />}
                                onClick={()=>{navigate('/users/create')}}>
                                Adicionar
                            </MenuItem>
                        </SubMenu>

                        <hr/>
                        
                        <MenuItem
                            icon={<MdLogout />}
                            onClick={logout}>
                            Sair
                        </MenuItem>
                    </Menu>
                </Sidebar>
            </div>
            ) : ('')}
        </div>
    );
};