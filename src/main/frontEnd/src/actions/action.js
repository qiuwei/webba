"use strict";
import _ from 'lodash';
import bows from 'bows';
import reduxCrud from 'redux-crud';
import cuid from 'cuid';
import {Resource} from 'hyperagent';

import actionTypes from './actionTypes';

import client from '../utils/client'
import follow from '../utils/follow'


const baseActionCreators = reduxCrud.actionCreatorsFor('tasks');
const log = bows('webba-actions');


const rootUrl = '/api';

let actionCreators = {
    //action to dipatch if the user log out
        logout() {

        },

        fetch() {
            return function (dispatch, getState) {
                const action = baseActionCreators.fetchStart();
                dispatch(action);

                //get all the tasks, note that the tasks are get one by one
                follow(client, root, [{rel: 'tasks', params: {size: pageSize}}]).then(taskCollection => {
                    return taskCollection.entity._embedded.tasks.map(task =>
                        client({
                            method: 'GET',
                            path: task._links.self.href
                        }));
                }).then(
                    taskPromises => {
                        return when.all(taskPromises);
                    }
                ).done(tasks => {
                    log("Feteched tasks:", tasks);
                    const successAction = baseActionCreators.fetchSuccess(tasks);
                    dispatch(successAction);
                    //todo
                }).fail((tasks) => {
                    log("Failed to fetch the tasks");
                    const errorAction = baseActionCreators.fetchError(tasks);
                });
            };
        },

        create(task)
        {

        }
        ,

        update(task)
        {

        }
        ,

        delete(task)
        {

        }
    }
    ;

actionCreators = _.extend(actionCreators, baseActionCreators);

export default actionCreators;
