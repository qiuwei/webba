import React, { PropTypes } from 'react';
import {Navbar, Nav, NavItem, Col, Row, Grid, Table, Button} from 'react-bootstrap';
import Task from './Task'
import _ from 'lodash';

//TaskList is a dumb componennt, the actual tasks and the callbacks should be injected using props
//TaskList further injects all of the related stuff in to Task
const TaskList = ({tasks, onStop, onDelete}) => (
    <Table>
        <tr>
            <th>Chain</th>
            <th>File</th>
            <th>Description</th>
            <th>Status</th>
            <th>Operations</th>
        </tr>
        <tbody>
        {_.map(tasks, task =>
            <Task id={task.id}
            chain={task.chainFilePath}
            file={task.fileToProcessPath}
            status={task.status}
            description={task.description}
            onStop={()=>onStop(task.id)}
            onDelete={()=>onDelete(task.id)}
            />)
        }
        </tbody>
    </Table>
);

TaskList.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        chainFilePath: PropTypes.string.isRequired,
        fileToProcessPath: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired
    })).isRequired,
    onDelete: PropTypes.func.isRequired,
    onStop: PropTypes.func.isRequired

};

export default TaskList;