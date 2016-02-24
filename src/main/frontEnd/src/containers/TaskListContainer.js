/**
 * Created by wqiu on 18/02/16.
 */

'use strict';
import TaskList from '../components/TaskList';
import PageNavigator from '../components/PageNavigator';
import {Panel} from 'react-bootstrap';
import {connect} from 'react-redux';
import bows from 'bows';
import React from 'react';
import store from '../store/store';
import actions from '../actions/action';

const log = bows('TaskListContainer');


const TaskListWithPagination = ({tasks, onStop, onDelete, items, activePage, handleSelect}) => {
    const footer = (<div className="text-center">
        <PageNavigator items={items}
                       activePage={activePage}
                       handleSelect={handleSelect}
        />
    </div>);
    return (
        <Panel bsStyle="primary" header="Tasks" footer={footer} >
            <TaskList tasks={tasks}
                      onStop={onStop}
                      onDelete={onDelete}
            />
        </Panel>
    )
};


const mapStateToProps = (state) => {
    return {
        tasks: store.getTasks(state),
        activePage: store.getCurrentPage(state) + 1,
        items: store.getTotalPages(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onStop: (id)=> log('onStop clicked:', id),
        onDelete: (id)=> log('onDelete clicked', id),
        handleSelect: (number)=> {
            log('Select page', number);
            //pagination index starts from 1, while api starts from 0
            const action = actions.changeCurrentPageAsync(number - 1);
            dispatch(action);
        }
    }
};

const TaskListContainer = connect(mapStateToProps, mapDispatchToProps)(
    TaskListWithPagination
);

export default TaskListContainer;
