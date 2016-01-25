'use strict';

// tag::vars[]
const React = require('react');
const client = require('./client');
const Dropzone = require('react-dropzone-component');
const Navbar = require('react-bootstrap').Navbar;
const Nav = require('react-bootstrap').Nav;
const NavItem = require('react-bootstrap').NavItem;
const Col = require('react-bootstrap').Col;
const Row = require('react-bootstrap').Row;
const Grid = require('react-bootstrap').Grid;
const Table = require('react-bootstrap').Table;

// end::vars[]
const navbarInstance = (
    <Navbar inverse>
        <Navbar.Header>
            <Navbar.Brand>
                <a href="#">Weblicht Batch Processing</a>
            </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
            <NavItem eventKey={1} href="#">Help</NavItem>
            <NavItem eventKey={2} href="#">About</NavItem>
        </Nav>
    </Navbar>
);

const dropzoneConfig = {
    iconFiletypes: ['.xml'],
    showFiletypeIcon: true,
    // Notice how there's no postUrl set here
    postUrl: '/upload'
};

const djsConfig = {
    addRemoveLinks: true
};

var callbackArray = [
    function () {
        console.log('Look Ma, I\'m a callback in an array!');
    },
    function () {
        console.log('Wooooow!');
    }
];

/**
 * Simple callbacks work too, of course.
 */
var simpleCallBack = function () {
    console.log('I\'m a simple callback');
};

var eventHandlers = {
    // All of these receive the event as first parameter:
    drop: callbackArray,
    dragstart: null,
    dragend: null,
    dragenter: null,
    dragover: null,
    dragleave: null,
    // All of these receive the file as first parameter:
    addedfile: simpleCallBack,
    removedfile: null,
    thumbnail: null,
    error: null,
    processing: null,
    uploadprogress: null,
    sending: null,
    success: null,
    complete: null,
    canceled: null,
    maxfilesreached: null,
    maxfilesexceeded: null,
    // All of these receive a list of files as first parameter
    // and are only called if the uploadMultiple option
    // in djsConfig is true:
    processingmultiple: null,
    sendingmultiple: null,
    successmultiple: null,
    completemultiple: null,
    canceledmultiple: null,
    // Special Events
    totaluploadprogress: null,
    reset: null,
    queuecompleted: null
};

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {tasks: []};
    }

    componentDidMount() {
        client({method: 'GET', path: '/api/tasks'}).done(response => {
            this.setState({tasks: response.entity._embedded.tasks});
        });
    }

    onDropChain (chain) {
        console.log("Recieved chain: ", chain);
    }

    onDropFile (files) {
        console.log("Received files: ", files);
    }

    render() {

        return (
            <div>
                {navbarInstance}
                <Grid>
                    <Row>
                        <Col md={6}>
                            <Dropzone config={dropzoneConfig} eventHandlers={eventHandlers} djsConfig={djsConfig}>
                            </Dropzone>
                        </Col>
                        <Col md={6}>
                            <Dropzone config={dropzoneConfig} eventHandlers={eventHandlers} djsConfig={djsConfig}>
                            </Dropzone>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                            <TaskList tasks={this.state.tasks}/>
                    </Row>
                </Grid>
            </div>
        )
    }
}

class TaskList extends React.Component{
    render() {
        var tasks = this.props.tasks.map(task =>
                <Task key={task._links.self.href} task ={task}/>
        );
        return (
            <Table>
                <tr>
                    <th>Chain</th>
                    <th>File</th>
                    <th>Description</th>
                    <th>Status</th>
                </tr>
                <tbody>
                    {tasks}
                </tbody>
            </Table>
        )
    }
}
class Task extends React.Component{
    render() {
        return (
            <tr>
                <td>{this.props.task.chainFilePath}</td>
                <td>{this.props.task.fileToProcessPath}</td>
                <td>{this.props.task.description}</td>
                <td>{this.props.task.status}</td>
            </tr>
        )
    }
}
React.render(
    <App />,
    document.getElementById('react')
)