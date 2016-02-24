"use strict";
import _ from 'lodash';
import bows from 'bows';
import reduxCrud from 'redux-crud';
import cuid from 'cuid';
import when from 'when';
import store from '../store/store';

import actionTypes from './actionTypes';

import client from '../utils/client'
import follow from '../utils/follow'


const baseActionCreators = reduxCrud.actionCreatorsFor('tasks');
const log = bows('webba-actions');


const rootUrl = '/api';

//sync actiona
//action to dipatch if the user log out
function logout() {
    return {
        type: actionTypes.USER_LOGOUT
    };
};

function changePageSize(pageSize, data) {
    return {type: actionTypes.PAGE_SIZE_CHANGE, pageSize: pageSize, data: data};
};


function changeCurrentPage(pageNumber, data) {
    return {type: actionTypes.CURRENT_PAGE_CHANGE, pageNumber: pageNumber, data: data};
};

function fetch() {
    const fetchSchema = function (rootPromise) {
        return rootPromise.then(response => {
            return client.get(response.data._links.profile.href, {headers: {'Accept': 'application/schema+json'}}).then(response => response.data);
        });
    };
    const fetchLinksAndPage = function (rootPromise) {
        return rootPromise.then(response => {
            return {links: response.data._links, page: response.data.page};
        })
    };
    const fetchTasks = function (rootPromise) {
        return rootPromise.then(response => {
            return response.data._embedded.tasks.map(task => client.get(task._links.self.href));
        }).then(taskPromises => {
            return when.all(taskPromises);
        }).then(tasks => {
            return tasks.map(task => {
                let data = task.data; //we use the uri as the key!
                return _.assign(data, {id: data._links.self.href});
            });
        });
    };
    return function (dispatch, getState) {
        const action = baseActionCreators.fetchStart();
        dispatch(action);
        const state = getState();
        const pageSize = store.getPageSize(state);
        const currentPage = store.getCurrentPage(state);
        let additionalData = {};
        const rootPromise = follow(client, rootUrl, [{rel: 'tasks', params: {page: currentPage, size: pageSize}}]);
        rootPromise.then(response => {
            log("Fetch response:", response);
        });
        return fetchSchema(rootPromise).then(schema => {
            _.assign(additionalData, {schema: schema});
            return fetchLinksAndPage(rootPromise);
        }).then(linksAndPage => {
            _.assign(additionalData, linksAndPage);
            return fetchTasks(rootPromise);
        }).then(tasks => {
            dispatch(baseActionCreators.fetchSuccess(tasks, additionalData));
        }).catch(err => {
            log("Fetch tasks failed", err);
        });
    };
};

function create(task) {
    return function (dispatch) {
        const cid = cuid();
        task = task.merge({cid: cid});
        const action = baseActionCreators.createStart(task);
        dispatch(action);
    }
};

function update(task) {
};

function remove(taskId) { //taskID is the uri as well
    client.delete(taskId)
};

function changePageSizeAsync(pageSize) {
    return function (dispatch, getState) {
        dispatch(changePageSize(pageSize));
        dispatch(fetch());
    }
};


function changeCurrentPageAsync(pageNumber) {
    return function (dispatch, getState) {
        dispatch(changeCurrentPage(pageNumber));
        dispatch(fetch());
    }
};

const actionCreators = _.extend(
    {
        logout,
        fetch,
        create,
        update,
        remove,
        changePageSizeAsync,
        changeCurrentPageAsync,
    },
    baseActionCreators
);

export default actionCreators;
