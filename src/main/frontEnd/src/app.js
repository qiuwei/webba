'use strict';

// tag::vars[]
import {Navbar, Nav, NavItem, Col, Row, Grid, Table, Button} from 'react-bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import client from './utils/client';
import follow from './utils/follow';
import when from 'when';
import bows from 'bows';
import {chainDropZone, fileDropZone} from './components/dropzone';
import axios from 'axios';
require('./assets/main.css');

const root = '/api';
let log = bows('app');

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
            <NavItem eventKey={3} href="/logout">Logout</NavItem>
        </Nav>
    </Navbar>
);

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            attributes: [],
            pageSize: 5,
            links: {}
        };
        this.updatePageSize = this.updatePageSize.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onNavigate = this.onNavigate.bind(this);
    }


    loadFromServer(pageSize) {
        follow(client, root, [{rel: 'tasks', params: {size: pageSize}}]).then(
            taskCollection => {
                return client.get(taskCollection.data._links.profile.href, {
                    headers: {'Accept': 'application/schema+json'}
                }).then(schema => {
                    this.schema = schema.data;
                    this.links = taskCollection.data._links;
                    return taskCollection;
                });
            }
        ).then(taskCollection => {
            return taskCollection.data._embedded.tasks.map(task =>
                client.get(task._links.self.href));
        }).then(
            taskPromises => {
                return when.all(taskPromises);
            }
        ).then(tasks => {
            log("Feteched tasks:", tasks);
            this.setState({
                tasks: tasks,
                attributes: Object.keys(this.schema.properties).filter(attribute => attribute !== "webbaUser"),
                pageSize: pageSize,
                links: this.links
            });
        });
    }

    componentDidMount() {
        log('App started');

        axios.get('/api/tasks').then(
            response => {
                log("Test response", response);
            }
        );
        this.loadFromServer(this.state.pageSize);
    }

    onDropChain(chain) {
        console.log("Recieved chain: ", chain);
    }

    onDropFile(files) {
        console.log("Received files: ", files);
    }

    onCreate(newTask) {
        follow(client, root, ['tasks']).then(response => {
            return client.post(response.data._links.self.href, newTask, {
                headers: {'Content-Type': 'application/json'}
            })
        }).then(response => {
            return follow(client, root, [
                {rel: 'tasks', params: {'size': this.state.pageSize}}]);
        }).then(response => {
            log("Create task");
            log("response.data", response.data);
            log("response.config", response.config);
            this.onNavigate(response.data._links.last.href);
        }).catch(response => {
            if (response instanceof Error) {
                log("Error creating task", response.message);
            } else {
                log("response.data", response.data);
                log("response.config", response.config);
            }
        });
    }

    onDelete(task) {
        client.delete(task.data._links.self.href).then(response => {
            this.loadFromServer(this.state.pageSize);
        });
    }

    onNavigate(navUri) {
        client.get(navUri).then(
            taskCollection => {
                this.links = taskCollection.data._links;

                return taskCollection.data._embedded.tasks.map(task =>
                    client.get(task._links.self.href));
            }
        ).then(
            taskPromises => {
                return when.all(taskPromises);
            }
        ).then(tasks => {
            this.setState({
                tasks: tasks,
                attributes: Object.keys(this.schema.properties),
                pageSize: this.state.pageSize,
                links: this.links
            });
        });
    }

    updatePageSize(pageSize) {
        if (pageSize !== this.state.pageSize) {
            this.loadFromServer(pageSize);
        }
    }

    render() {

        return (
            <div>
                {navbarInstance}
                <Grid>
                    <Row>
                        <Col md={6}>
                            {chainDropZone}
                        </Col>
                        <Col md={6}>
                            {fileDropZone}
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <CreateDialog attributes={this.state.attributes} onCreate={this.onCreate}/>
                        <TaskList tasks={this.state.tasks}
                                  links={this.state.links}
                                  pageSize={this.state.pageSize}
                                  attributes={this.state.attributes}
                                  onNavigate={this.onNavigate}
                                  onDelete={this.onDelete}
                                  updatePageSize={this.updatePageSize}/>
                    </Row>
                </Grid>
            </div>
        );
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
            newTask[attribute] = React.findDOMNode(this.refs[attribute]).value.trim();
        });
        this.props.onCreate(newTask);

        this.props.attributes.forEach(attribute => {
            ReactDOM.findDOMNode(this.refs[attribute]).value = '';
        });

        window.location = "#";
    }

    render() {
        log(this.props.attributes);
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
                            <button onClick={this.handleSubmit}>Create</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.handleNavFirst = this.handleNavFirst.bind(this);
        this.handleNavPrev = this.handleNavPrev.bind(this);
        this.handleNavNext = this.handleNavNext.bind(this);
        this.handleNavLast = this.handleNavLast.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(e) {
        e.preventDefault();
        var pageSize = ReactDOM.findDOMNode(this.refs.pageSize).value;
        if (/^[0-9]+$/.test(pageSize)) {
            this.props.updatePageSize(pageSize);
        } else {
            ReactDOM.findDOMNode(this.refs.pageSize).value =
                pageSize.substring(0, pageSize.length - 1);
        }
    }

    handleNavFirst(e) {
        e.preventDefault();
        this.props.onNavigate(this.props.links.first.href);
    }

    handleNavPrev(e) {
        e.preventDefault();
        this.props.onNavigate(this.props.links.prev.href);
    }

    handleNavNext(e) {
        e.preventDefault();
        this.props.onNavigate(this.props.links.next.href);
    }

    handleNavLast(e) {
        e.preventDefault();
        this.props.onNavigate(this.props.links.last.href);
    }

    render() {
        var tasks = this.props.tasks.map(task =>
            <Task key={task.data._links.self.href} task={task} attributes={this.props.attributes}
                  onDelete={this.props.onDelete}/>
        );

        var navLinks = [];

        if ("first" in this.props.links) {
            navLinks.push(<button key="first" onClick={this.handleNavFirst}> &lt;&lt;</button>);
        }

        if ("prev" in this.props.links) {
            navLinks.push(<button key="prev" onClick={this.handleNavPrev}> &lt;</button>);
        }
        if ("next" in this.props.links) {
            navLinks.push(<button key="next" onClick={this.handleNavNext}> &gt;</button>);
        }
        if ("last" in this.props.links) {
            navLinks.push(<button key="last" onClick={this.handleNavLast}> &gt;&gt;</button>);
        }
        return (
            <div>
                <input ref="pageSize" defaultValue={this.props.pageSize} onInput={this.handleInput}/>
                <Table>
                    <tr>
                        <th>Chain</th>
                        <th>File</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                    <tbody>
                    {tasks}
                    </tbody>
                </Table>
                <div>
                    {navLinks}
                </div>
            </div>
        );
    }
}
class Task extends React.Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        this.props.onDelete(this.props.task);
    }

    render() {
        return (
            <tr>
                <td>{this.props.task.data.chainFilePath}</td>
                <td>{this.props.task.data.fileToProcessPath}</td>
                <td>{this.props.task.data.description}</td>
                <td>{this.props.task.data.status}</td>
                <td><Button onClick={this.handleDelete}>stop</Button></td>
            </tr>
        );
    }
}
ReactDOM.render(
    <App />,
    document.getElementById('react')
);
