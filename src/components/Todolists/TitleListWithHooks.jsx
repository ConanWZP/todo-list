import React, {useEffect, useState} from "react";
import styles from "./GeneralList.module.css";

const TitleListWithHooks = (props) => {



    /*let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState(props.listTitle)

    useEffect(() => {
        setTitle(props.listTitle)
    }, [props.listTitle])

    /!*useEffect(() => {
        props.updateListTitle(props.id, props.title)
    }, [props.title])*!/

    let activateMode = () => {
        setEditMode(true)
    }

    let deactivateMode = () => {
        setEditMode(false)
        props.updateListTitle(props.id, title)
    }

    let onChangeTitle = (btn) => {
        setTitle(btn.currentTarget.value)
    }*/

    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState(props.title)

    useEffect(() => {
        setTitle(props.title)
    }, [props.title])

    /*useEffect(() => {
        props.updateListTitle(props.id, props.title)
    }, [props.title])*/

    let activateMode = () => {
        setEditMode(true)
    }

    let deactivateMode = () => {
        setEditMode(false)
        props.updateListTitle(props.id, title)
    }

    let onChangeTitle = (btn) => {
        setTitle(btn.currentTarget.value)
    }

    return (
        <div>
            {/*{!editMode && <span onClick={activateMode} className={styles.testMargin}>{props.listTitle}</span>}*/}
            {!editMode && <span onClick={activateMode} className={styles.testMargin}>{props.title}</span>}
            {editMode && <input onChange={onChangeTitle} autoFocus={true} onBlur={deactivateMode} value={title}/>}

        </div>
    )
}

export default TitleListWithHooks