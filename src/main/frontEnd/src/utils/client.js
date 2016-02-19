'use strict';

import axios from 'axios';
//var rest = require('rest');
//var defaultRequest = require('rest/interceptor/defaultRequest');
//var mime = require('rest/interceptor/mime');
//var uriTemplateInterceptor = require('../api/uriTemplateInterceptor');
//var errorCode = require('rest/interceptor/errorCode');
//var baseRegistry = require('rest/mime/registry');
//
//var registry = baseRegistry.child();
//
//registry.register('text/uri-list', require('../api/uriListConverter'));
//registry.register('application/hal+json', require('rest/mime/type/application/hal'));
//
//export default rest
//    .wrap(mime, {registry: registry})
//    .wrap(uriTemplateInterceptor)
//    .wrap(errorCode)
//    .wrap(defaultRequest, {headers: {'Accept': 'application/hal+json'}});

let instance = axios.create();

const uriTemplateInterceptor = function (request /*, config, meta */) {
    /* If the URI is a URI Template per RFC 6570 (http://tools.ietf.org/html/rfc6570), trim out the template part */
    if (request.url.indexOf('{') === -1) {
        return request;
    } else {
        request.url = request.url.split('{')[0];
        return request;
    }
};
instance.interceptors.request.use(uriTemplateInterceptor);

export default instance;

