'use strict'

import reduxCrud from 'redux-crud';

const baseActionTypes = reduxCrud.actionTypesFor('tasks');

let actionTypes = {
    USER_LOGOUT: 'USER_LOGOUT',
    USER_LOGIN: 'USER_LOGIN'
}


actionTypes = _.extend(actionTypes, baseActionTypes);

export default actionTypes;
