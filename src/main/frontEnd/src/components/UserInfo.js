'use strict';
import {Navbar} from 'react-bootstrap';

const UserInfo = ({userName}) => (
    <Navbar.Text>Welcome {userName}</Navbar.Text>
);