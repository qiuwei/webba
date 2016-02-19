/**
 *
 * Created by wqiu on 27/01/16.
 */

'use strict';
import bows from 'bows';

const log = bows('utils/follow');

export default function follow(api, rootPath, relArray) {
    const root = api.get(rootPath);
    log("relArray is: ", relArray);

    return relArray.reduce(function (root, arrayItem) {
        var rel = typeof arrayItem === 'string' ? arrayItem : arrayItem.rel;
        return traverseNext(root, rel, arrayItem);
    }, root);

    function traverseNext(root, rel, arrayItem) {
        return root.then(function (response) {
            log(response);
            if (hasEmbeddedRel(response.data, rel)) {
                return response.data._embedded[rel];
            }

            if (!response.data._links) {
                return [];
            }

            if (typeof arrayItem === 'string') {
                return api.get(response.data._links[rel].href);
            } else {
                return api.get(response.data._links[rel].href, {params: arrayItem.params});
            }
        });
    }

    function hasEmbeddedRel(data, rel) {
        return data._embedded && data._embedded.hasOwnProperty(rel);
    }
};
