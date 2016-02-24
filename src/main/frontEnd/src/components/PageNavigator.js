/**
 * Created by wqiu on 18/02/16.
 */

'use strict';
import React from 'react';

import {Pagination} from 'react-bootstrap';
import {PropTypes} from 'react';

const PageNavigator = ({items, activePage, handleSelect}) => (
    <Pagination items={items}
                activePage={activePage}
                onSelect={(event, selectedEvent) => handleSelect(selectedEvent.eventKey)}
    />
);

PageNavigator.propTypes = {
    items: PropTypes.number.isRequired,
    activePage: PropTypes.number.isRequired,
    onSelect: PropTypes.func.isRequired,
};

export default PageNavigator;
