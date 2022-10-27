import React from "react";
import classes from "./../Navbar.module.css"
import {NavLink} from "react-router-dom";

const FriendItem = (props) => {
    let pathToFriend = '/friends/' + props.userId;
    return (
        /*<div className={classes.dialog + " " + classes.active}>
            <NavLink to={pathToFriend}>{props.userName}</NavLink>
        </div>*/
        <NavLink to={pathToFriend}>{props.userName}</NavLink>
    )
}


export default FriendItem;


