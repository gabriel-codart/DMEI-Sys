import React, { useState } from 'react';
import {
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Navbar,
  NavbarBrand
} from 'reactstrap';

import './navbar.css';

export default function NavBar() {
  //Botao Dropdown
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <div>
      <Navbar>
        <NavbarBrand>DMEIsys</NavbarBrand>

        <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={'down'}>
          <DropdownToggle caret color="white">
            Mais
          </DropdownToggle>

          <DropdownMenu>
              <DropdownItem>Opções</DropdownItem>
              <DropdownItem>Sair</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Navbar>
    </div>
  );
};