import React from 'react';
import { Sidebar, Menu, SubMenu, MenuItem } from 'react-pro-sidebar';
import { BsBarChartFill } from 'react-icons/bs';
import { MdAddBox } from 'react-icons/md';
import { FaUsers, FaBuilding, FaListUl } from 'react-icons/fa';
import { Link } from 'react-router-dom';


import useAuth from '../../contexts/useAuth';

import './side-menu.css';

export default function SideMenu() {
    const { signed } = useAuth();

    return (
        <div>
            {signed ? (
            <div className='side-menu'>
                <Sidebar className='side-bar'>
                    <Menu transitionDuration={1000}>
                        <h1 className='title'>DMEIsys</h1>
                        <hr/>

                        <Link to={'/users/create'}>
                            <MenuItem icon={<BsBarChartFill />}>Adicionar</MenuItem>
                        </Link>
                        <hr/>

                        <SubMenu label="Entidades" icon={<FaBuilding />}>
                            <Link to={'/entities'}>
                                <MenuItem icon={<FaListUl />}>Listar</MenuItem>
                            </Link>
                            <Link to={'/entities/create'}>
                                <MenuItem icon={<MdAddBox />}>Adicionar</MenuItem>
                            </Link>
                        </SubMenu>

                        <SubMenu label="Usuários" icon={<FaUsers />}>
                            <Link to={'/users'}>
                                <MenuItem icon={<FaListUl />}>Listar</MenuItem>
                            </Link>
                            <Link to={'/users/create'}>
                                <MenuItem icon={<MdAddBox />}>Adicionar</MenuItem>
                            </Link>
                        </SubMenu>
                        <hr/>
                    </Menu>
                </Sidebar>
            </div>
            ) : ('')}
        </div>
    );
};