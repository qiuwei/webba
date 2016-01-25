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
                            <Dropzone onDrop={this.onDropChain}>
                                <div>Drop a chain file here, or click to select a chain to upload.</div>
                            </Dropzone>
                        </Col>
                        <Col md={6}>
                            <Dropzone onDrop={this.onDropFile}>
                                <div>Drop a file here, or click to select a file to upload.</div>
                            </Dropzone>
                        </Col>
                    </Row>

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