import preloader from "../../../assets/images/preloader.svg";
import React from "react";
import styles from './Preloader.module.css';

let Preloader = (props) => {
    return (
        <div className={styles.block}>
            <img className={styles.image} src={preloader}/>
        </div>

        )

}

export default Preloader;