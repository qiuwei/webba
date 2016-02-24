'use strict'

import reduxCrud from 'redux-crud';

const baseActionTypes = reduxCrud.actionTypesFor('tasks');

let actionTypes = {
    USER_LOGOUT: 'USER_LOGOUT',
    USER_LOGIN: 'USER_LOGIN',
    PAGE_SIZE_CHANGE: 'PAGE_SIZE_CHANGE',
    CURRENT_PAGE_CHANGE: 'CURRENT_PAGE_CHANGE'
};


actionTypes = _.extend(actionTypes, baseActionTypes);

export default actionTypes;
