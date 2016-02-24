'use strict';

import SI from 'seamless-immutable';
import reduxCrud from 'redux-crud';
import actionTypes from '../actions/actionTypes';
import {combineReducers} from 'redux'
import bows from 'bows';
import store from '../store/store';

const baseReducers = reduxCrud.reducersFor('tasks');
const log = bows('webba-reducer');

// the whole state looks like

const state = {
    currentUser: "Wei",
    schema: [],
    totalTaskNum: 20,
    tasks: [],
    currentPage: 2,
    pageSize: 5,
    newTask: { //task to be created, will be created on server if user click on create
        chain: 208309280348,
        files: [2038240398092, 29034820384],
        description: "test"
    }
};


function schema(state = SI({}), action) {
    switch (action.type) {
        case actionTypes.TASKS_FETCH_SUCCESS:
            return SI(action.data.schema);
        default:
            return state;
    }
}

function links(state = SI({}), action) {
    switch (action.type) {
        case actionTypes.TASKS_FETCH_SUCCESS:
            return SI(action.data.links);
        default:
            return state;
    }
}


function page( state = SI({size:5, totalElements: 0, totalPages: 0, number:0}), action) {
    switch (action.type) {
        case actionTypes.TASKS_FETCH_SUCCESS:
            return SI(action.data.page);
        case actionTypes.CURRENT_PAGE_CHANGE:
            return _.defaults({number: action.pageNumber}, state);
        case actionTypes.PAGE_SIZE_CHANGE:
            return _.defaults({size: action.pageSize}, state);
        default:
            return state;
    }
}

function tasks(state = SI([]), action) {
    switch (action.type) {
        //put additional data in the state
        case actionTypes.TASKS_FETCH_SUCCESS:
            const tasks = action.records;
            return SI(tasks);
        //augment with your own reducers
        default:
            //delegate to the reducers created by redux-crud
            return baseReducers(state, action)
    }
}


function userName(state = 'Anonymous', action) {
    switch (action.type) {
        case actionTypes.USER_LOGIN:
            return action.userName;
        case actionTypes.USER_LOGOUT:
            return state;
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    userName,
    page,
    schema,
    links,
    tasks,
});

export default rootReducer;
