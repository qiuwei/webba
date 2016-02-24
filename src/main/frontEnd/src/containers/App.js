'use strict';

//this is new entry point for redux application

import React from 'react';
import HeaderContainer from './HeaderContainer';
import TaskCreator from './TaskCreator';
import TaskListContainer from './TaskListContainer';
import actions from '../actions/action';
import {connect}  from 'react-redux';
import {Grid} from 'react-bootstrap';


class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.fetchTasks();
    }

    get dispatch() {
        return this.props.dispatch;
    }

    fetchTasks() {
        const action = actions.fetch();
        this.dispatch(action);
    }

    render() {
        return (
            <div>
                <HeaderContainer />
                <Grid>
                    <TaskCreator />
                    <br/>
                    <TaskListContainer />
                </Grid>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: dispatch
    };
};

export default connect((state) => state, mapDispatchToProps)(App);
