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

import './navbar.css';

export default function NavBar() {
  //Botao Dropdown
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const { signed } = useAuth();

  return (
    <div>
      <Navbar>
        <NavbarBrand>DMEIsys</NavbarBrand>

        {signed ? (
          <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={'down'}>
            <DropdownToggle caret color="white">
              Mais
            </DropdownToggle>

            <DropdownMenu>
                <DropdownItem>Opções</DropdownItem>
                <DropdownItem>Sair</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : ('')}
        
      </Navbar>
    </div>
  );
};