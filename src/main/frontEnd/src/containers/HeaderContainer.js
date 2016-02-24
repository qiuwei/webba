'use strict';

import Header from '../components/Header';
import {logout} from '../actions/action';
import {connect} from 'react-redux'
import store from '../store/store'


const mapStateToProps = (state) => {
    return {
        userName: 'Wei Qiu'
    }
};

//will dispatch a logout action, action is create using action creator
const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            log('log out!');
        }
    }
};

const HeaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);

export default HeaderContainer;
