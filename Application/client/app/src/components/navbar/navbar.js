import React, { useState } from 'react';
import {
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Navbar,
  NavbarBrand
} from 'reactstrap';
import useAuth from '../../contexts/useAuth';
import { useNavigate } from 'react-router-dom';

import { FaUserCircle } from 'react-icons/fa';
import './navbar.css';

export default function NavBar() {
  //Botao Dropdown
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const navigate = useNavigate();
  const { signed } = useAuth();
  const { user } = useAuth();
  const { signout } = useAuth();

  const signOut = () => {
    navigate('/');
    signout();
  };

  return (
    <div>
      <Navbar>
        <NavbarBrand>DMEIsys</NavbarBrand>

        {signed ? (
          <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={'down'}>
            <DropdownToggle caret color="white">
              <FaUserCircle/>
              {user.nickname}
            </DropdownToggle>

            <DropdownMenu>
                <DropdownItem>Opções</DropdownItem>
                <DropdownItem onClick={signOut}>Sair</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : ('')}
        
      </Navbar>
    </div>
  );
};