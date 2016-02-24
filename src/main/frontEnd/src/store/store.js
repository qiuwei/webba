'use strict';

import bows from 'bows';

const log = bows('Store');
//some getters for the store


function getLinks(store) {
    return store.links;
}

function getTasks(store) {
    return store.tasks;
}

function getSchema(store) {
    return store.schema;
}

function getCurrentUser(store) {
    return store.currentUser;
}

function getTotalTaskNum(store) {
    return store.page.totalElements;
}

function getCurrentPage(store) {
    return store.page.number;
}

function getPageSize(store) {
    return store.page.size;
}

function getTotalPages(store) {
    return store.page.totalPages;
}
export default {getPageSize, getLinks, getTasks, getSchema, getCurrentUser, getTotalTaskNum, getCurrentPage, getTotalPages};