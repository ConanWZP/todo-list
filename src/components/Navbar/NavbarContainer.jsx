import React from 'react';
import classes from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import Navbar from "./Navbar";
import {connect} from "react-redux";
import {getAuthUserData, logout} from "../../redux/auth-reducer";
import {getLists} from "../../redux/list-reducer";





const setActive = ({isActive}) => isActive ? classes.activeLink : '';
// Аналогичная запись:
let d;
const sB = function ({isActive}) {
    if (isActive) {
        d = classes.activeLink;
        console.log({isActive});
        console.log(isActive);
    } else d = '';
    return d;
}

class NavbarClass extends React.Component {
    componentDidMount() {
        this.props.getAuthUserData();
        this.props.getLists();
    }

    render() {
        return (
            <Navbar {...this.props} />
        )
    }
}


let mapStateToProps = (state) => {
    return {
        /*friendsList: state.sideBar.friendListData,*/
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}


const NavbarContainer = connect(mapStateToProps, {getAuthUserData, logout, getLists})(NavbarClass);

export default NavbarContainer;