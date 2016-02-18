'use strict';

//this is new entry point for redux application

import React from 'react';
import HeaderContainer from '../containers/HeaderContainer';
import TaskCreator from '../containers/TaskCreator';
import TaskListContainer from '../containers/TaskListContainer';

const App = () => (
    <div>
        <HeaderContainer />
        <TaskCreator />
        <TaskListContainer />
    </div>
);

export default App;
