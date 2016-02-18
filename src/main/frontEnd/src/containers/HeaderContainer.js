'use strict';

import Header from '../components/Header';
import {logout} from '../actions/action';
import {connect} from 'react-redux'

const getUserName = (state) => {
    return state.currentUser;
};

const mapStateToProps = (state) => {
    return {
        userName: getUserName(state)
    }
};

//will dispatch a logout action, action is create using action creator
const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => {
            dispatch(logout())
        }
    }
};

const HeaderContainer = connect(
    getUserName
)(Header);

export default HeaderContainer;
