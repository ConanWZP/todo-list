import React from 'react';
import classes from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import FriendItem from "./FriendItem/FriendItem";
import Header from "../Header/Header";

console.log(classes);


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






const Navbar = (props) => {
   /* let friendsElements = props.friendsList.map((elOfDialog) => {
        return (
            <FriendItem userName={elOfDialog.userName} userId={elOfDialog.userId} />
        )
    });*/



    return (
        <nav className={classes.nav}>
            <Header {...props} />
            <div className={classes.item}>
                <NavLink to='/todo-list' className={sB}>Список задач</NavLink>
            </div>
            {/*<div className={classes.item}>
                <NavLink to='/dialogs' className={setActive}>Dialogs</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to='/users' className={setActive}>Users</NavLink>
            </div>
            <div className={`${classes.item} ${classes.activeLink}`}>
                <NavLink to='/news' className={setActive}>News</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to='/music' className={setActive}>Music</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to='/settings' className={setActive}>Settings</NavLink>
            </div>
            <div className={`${classes.item} ${classes.activKa}`}>text
            </div>
            <div className={classes.item + ' ' + classes.activKa}>text2</div>
            <div className={`${classes.item} ${classes.last}`}>
                <NavLink to={'/friends'} className={setActive}>Friends</NavLink>
                <div className={classes.friends}>
                        <div className={classes.avatar}></div>
                        <div className={classes.avatar}></div>
                        <div className={classes.avatar}></div>


                        <div className={classes.name}>{friendsElements[0]}</div>
                        <div className={classes.name}>{friendsElements[1]}</div>
                        <div className={classes.name}>{friendsElements[2]}</div>
                </div>
            </div>*/}
        </nav>
    );
}



export default Navbar;