import React from 'react';
import { Link } from 'react-router-dom';
import {
    Sidebar,
    SidebarHeader,
    SidebarBody,
    MenuBar,
    MenuItem,
    SubMenuBar,
    SidebarFooter
} from 'react-sidebar-pro/lib';

import useAuth from '../../contexts/useAuth';

import './side-menu.css';

export default function SideMenu() {
    const { signed } = useAuth();

    return (
        <div className='side-menu-border'>
            {signed ? (
            <div className='side-menu'>
                <Sidebar className="sidebar_custom">
                    <SidebarHeader>
                        DMEIsys
                    </SidebarHeader>
                    <SidebarBody>
                        <MenuBar>
                            <MenuItem
                                to='/'
                                text='Dashboard'
                            />
                            <MenuItem
                                to='/'
                                text='Projects'
                            />
                            
                            <SubMenuBar label="Entities">
                                <li>
                                    <Link className='menu_item' to='/entities'> List </Link>
                                </li>
                                <li>
                                    <Link className='menu_item' to='/entities/create'> Add </Link>
                                </li>
                            </SubMenuBar>

                            <SubMenuBar label="Users">
                                <li>
                                    <Link className='menu_item' to='/users'> List </Link>
                                </li>
                                <li>
                                    <Link className='menu_item' to='/users/create'> Add </Link>
                                </li>
                            </SubMenuBar>
                        </MenuBar>
                    </SidebarBody>

                    <SidebarFooter>
                        @DMEI_sys criado com React.js
                    </SidebarFooter>
                </Sidebar>
            </div>
            ) : ('')}
        </div>
    );
};