'use strict';

// tag::vars[]
const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');
const follow = require('./follow');
const Navbar = require('react-bootstrap').Navbar;
const Nav = require('react-bootstrap').Nav;
const NavItem = require('react-bootstrap').NavItem;
const Col = require('react-bootstrap').Col;
const Row = require('react-bootstrap').Row;
const Grid = require('react-bootstrap').Grid;
const Table = require('react-bootstrap').Table;
const cmdiDropZone = require('./dropzone').cmdiDropZone;
const fileDropZone = require('./dropzone').fileDropZone;

const root = '/api';

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
        this.state = {
            tasks: [],
            attributes: [],
            pageSize: 2,
            links: {}
        };
    }

    loadFromServer(pageSize) {
        follow(client, root, [{rel: 'tasks', params: {size: pageSize}}]).then(
                taskCollection => {
                return client({
                    method: 'GET',
                    path: taskCollection.entity._links.profile.href,
                    headers: {'Accept': 'application/schema+json'}
                }).then(schema => {
                        this.schema = schema.entity;
                        return taskCollection;
                    }
                );
            }
        ).done(taskCollection => {
                this.setState({
                    tasks: taskCollection.entity._embedded.tasks,
                    attributes: Object.keys(this.schema.properties),
                    pageSize: pageSize,
                    links: taskCollection.entity._links
                });
            });
    }

    componentDidMount() {
        this.loadFromServer(this.state.pageSize);
    }

    onDropChain(chain) {
        console.log("Recieved chain: ", chain);
    }

    onDropFile(files) {
        console.log("Received files: ", files);
    }

    onCreate(newTask) {
        follow(client, root, ['tasks']).then(taskCollection => {
            return client({
                method: 'POST',
                path: taskCollection.entity._links.self.href,
                entity: newTask,
                headers: {'Content-Type': 'application/json'}
            })
        }).then(response => {
            return follow(client, root, [
                {rel: 'tasks', params: {'size': this.state.pageSize}}]);
        }).done(response => {
            this.onNavigate(response.entity._links.last.href);
        });
    }

    onDelete(task) {
        client({method: 'DELETE', path: task._links.self.href}).done(response => {
            this.loadFromServer(this.state.pageSize);
        });
    }

    onNavigate(navUri) {
        client({method: 'GET', path: navUri}).done(taskCollection => {
            this.setState({
                tasks: taskCollection.entity._embedded.tasks,
                attributes: this.state.attributes,
                pageSize: this.state.pageSize,
                links: taskCollection.entity._links
            });
        });
    }

    render() {

        return (
            <div>
                {navbarInstance}
                <Grid>
                    <Row>
                        <Col md={6}>
                            {cmdiDropZone}
                        </Col>
                        <Col md={6}>
                            {fileDropZone}
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <CreateDialog attribute={this.state.attributes} onCreate={this.onCreate}/>
                        <TaskList tasks={this.state.tasks}/>
                    </Row>
                </Grid>
            </div>
        )
    }
}


class CreateDialog extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        var newTask = {};
        this.props.attributes.forEach(attribute => {
            newTask[attribute] = React.findDOMNode(this.refs[attribute]).value.trim;
        });
        this.props.onCreate(newTask);

        this.props.attributes.forEach(attribute => {
            React.findDOMNode(this.refs[attribute].value = '');
        });

        window.location = "#";
    }

    render() {
        var inputs = this.props.attributes.map(attribute =>
                <p key={attribute}>
                    <input type="text" placeholder={attribute} ref={attribute} className="field"/>
                </p>
        );

        return (
            <div>
                <a href="#createTask">Create</a>

                <div id="createTask" className="modalDialog">
                    <div>
                        <a href="#" title="Close" className="close">X</a>

                        <h2>Create new task</h2>

                        <form>
                            {inputs}
                            <button onClick={this.handleSubmit()}>Create</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

class TaskList extends React.Component {
    render() {
        var tasks = this.props.tasks.map(task =>
                <Task key={task._links.self.href} task={task}/>
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
class Task extends React.Component {
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
ReactDOM.render(
    <App />,
    document.getElementById('react')
)
