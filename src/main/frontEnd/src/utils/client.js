'use strict';

import axios from 'axios';

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

