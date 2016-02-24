/**
 * Created by wqiu on 18/02/16.
 */

'use strict';

import {chainDropZone, fileDropZone} from '../components/dropzone';
import React from 'react';
import {Row, Col, Button} from 'react-bootstrap';

const TaskCreator = () => (
    <div>
        <Row>
            <Col md={6}>
                {chainDropZone}
            </Col>
            <Col md={6}>
                {fileDropZone}
            </Col>
        </Row>
        <br/>
        <div className="text-center">
            <Button>Create a new task</Button>
        </div>
    </div>
);

export default TaskCreator;

