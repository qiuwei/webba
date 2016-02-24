'use strict';

import {Navbar, Nav, NavItem} from 'react-bootstrap';
import React, {PropTypes} from 'react';
import UserInfo from './UserInfo';

//This directory contains the dumb components, they only know how to render, their callbacks are also props, they don't maintain any states
//The container directory contains the components which know how to interact with the store
const Header = ({userName, logout}) =>(
    <Navbar inverse>
        <Navbar.Header>
            <Navbar.Brand>
                <a href="#">Weblicht Batch Processing</a>
            </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
            <UserInfo userName={userName}/>
            <NavItem eventKey={1} href="#">Help</NavItem>
            <NavItem eventKey={2} href="#">About</NavItem>
            <NavItem eventKey={3} onClick={logout} href="/logout">Logout</NavItem>
        </Nav>
    </Navbar>
);

//This is just the type signature of this function, cumbersome javascript!
Header.propTypes = {
    userName: PropTypes.string.isRequired,
    logout: PropTypes.func.isRequired
};

export default Header;
