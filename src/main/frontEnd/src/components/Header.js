'use strict';

import {NavBar} from 'react-bootstrap';
import {PropTypes} from 'react';

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
            <Userinfo userName={userName}/>
            <NavItem eventKey={1} href="#">Help</NavItem>
            <NavItem eventKey={2} href="#">About</NavItem>
            <NavItem eventKey={3} onClick={logout} href="/logout">Logout</NavItem>
        </Nav>
    </Navbar>
);

//This is just the type signature of this function, cumbersome javascript!
Header.propTypes = {
    username: PropTypes.string.isRequired,
    logout: PropTypes.func.isRequired
};

export default Header;
