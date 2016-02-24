'use strict';
import {Navbar} from 'react-bootstrap';
import React from 'react';

const UserInfo = ({userName}) => (
    <Navbar.Text>Welcome {userName}</Navbar.Text>
);

export default UserInfo;