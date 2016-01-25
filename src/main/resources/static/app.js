'use strict';

// tag::vars[]
const React = require('react');
const client = require('./client');
const Dropzone = require('react-dropzone');
const Navbar = require('react-bootstrap').Navbar;
const Nav = require('react-bootstrap').Nav;
const NavItem = require('react-bootstrap').NavItem;
const Col = require('react-bootstrap').Col;
const Row = require('react-bootstrap').Row;
// end::vars[]
const navbarInstance = (
    <Navbar>
        <Navbar.Header>
            <Navbar.Brand>
                <a href="#">Weblicht Batch Processing</a>
            </Navbar.Brand>
        </Navbar.Header>
        <Nav>
            <NavItem eventKey={1} href="#">Help</NavItem>
            <NavItem eventKey={2} href="#">About</NavItem>
        </Nav>
    </Navbar>
);

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
                <Row>
                    <Col md={5} mdOffset={1}>
                        <Dropzone onDrop={this.onDropChain}>
                            <div>Drop a chain file here, or click to select a chain to upload.</div>
                        </Dropzone>
                    </Col>
                    <Col md={5}>
                        <Dropzone onDrop={this.onDropFile}>
                            <div>Drop a file here, or click to select a file to upload.</div>
                        </Dropzone>
                    </Col>
                </Row>

                <Row>
                    <Col md={10} mdOffset={1}>
                        <TaskList tasks={this.state.tasks}/>
                    </Col>
                </Row>
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
            <table>
                <tr>
                    <th>Chain</th>
                    <th>File</th>
                    <th>Description</th>
                    <th>Status</th>
                </tr>
                {tasks}
            </table>
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