/**
 * Created by wqiu on 18/02/16.
 */

'use strict';

import {chainDropZone, fileDropZone} from '../components/dropzone';

const TaskCreator = () => (
    <Row>
        <Col md={6}>
            {chainDropZone}
        </Col>
        <Col md={6}>
            {fileDropZone}
        </Col>
    </Row>
);

export default TaskCreator;

