'use strict';
import {Navbar, Nav, NavItem, Col, Row, Grid, Table, Button} from 'react-bootstrap';
import {PropTypes} from 'react';

const Task = ({id, chain, file, description, status, onStop, onDelete}) => (
    <tr>
        <td>{id}</td>
        <td>{chain}</td>
        <td>{file}</td>
        <td>{description}</td>
        <td>{status}</td>
        <td><Button onClick={e=> {
            e.preventDefault();
            onStop();
        }}>Stop</Button>
            <Button onClick={e => {
            e.preventDefault();
            onDelete;
            }}> </Button></td>
    </tr>
);

Task.propTypes = {
    id: PropTypes.number.isRequired,
    chain: PropTypes.string.isRequired,
    file: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
    onStop: PropTypes.func.isRequired
};

export default Task;
