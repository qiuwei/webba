"use strict";
import _ from 'lodash';
import bows from 'bows';
import reduxCrud from 'redux-crud';
import cuid from 'cuid';

import actionTypes from './actionTypes';
const baseActionCreators = reduxCrud.actionCreatorsFor('webba');
const log = bows('webba-actions');


let actionCreators = {
    fetch() {

    },

    create(task) {

    },

    update(task) {

    },

    delete(task) {

    }
};

actionCreators = _.extend(actionCreators, baseActionCreators);

export default actionCreators;
