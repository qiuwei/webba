/**
 * Created by wqiu on 18/02/16.
 */

'use strict';
import TaskList from "../components/TaskList";
import PageNavigator from "../components/PageNavigator";
import {connect} from 'react-redux';

const TaskListWithPagination = (tasks, onStop, onDelete, items, activePage, handleSelect) => (
    <div>
        <TaskList tasks={tasks}
                  onStop={onStop}
                  onDelete={onDelete}
        />
        <PageNavigator items={items}
                       activePage={activePage}
                       handleSelect={handleSelect}
        />
    </div>
);

const TaskListContainer = connect()(
    TaskListWithPagination
);

export default TaskListContainer;
