'use strict';

import SI from 'seamless-immutable';
import reduxCrud from 'redux-crud';
import actionTypes from '.';
import bows from 'bows';

const baseReducers = reduxCrud.reducersFor('webba');
const log = bows('webba-reducer');

// the whole state looks like

//const state = {
//    currentUser: "Wei",
//    totalTaskNum: 20,
//    tasks: [],
//    currentPage: 2,
//    itemPerPage: 5,
//    newTask: { //task to be created, will be created on server if user click on create
//        chain: 208309280348,
//        files: [2038240398092, 29034820384],
//        description: "test"
//    }
//};

function reducer(state=SI([]), action) {
    switch (action.type) {
        //augment with your own reducers
        default:
            //delegate to the reducers created by redux-crud
            return baseReducers(state, action)
    }
}

export default reducer
