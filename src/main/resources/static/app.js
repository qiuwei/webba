'use strict';

// tag::vars[]
const React = require('react');
const client = require('./client');
const Dropzone = require('react-dropzone');
// end::vars[]

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
                <div>
                    <Dropzone onDrop={this.onDropChain}>
                        <div>Try dropping a chain file here, or click to select a chain to upload.</div>
                    </Dropzone>
                </div>
                <div>
                    <Dropzone onDrop={this.onDropFile}>
                        <div>Try dropping a file here, or click to select a file to upload.</div>
                    </Dropzone>
                </div>

                <TaskList tasks={this.state.tasks}/>
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
            </tr>
        )
    }
}
React.render(
    <App />,
    document.getElementById('react')
)