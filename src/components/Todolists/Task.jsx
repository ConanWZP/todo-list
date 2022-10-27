import React, {useState} from "react";
import styles from './Tasks.module.css'
import {errorCatcher, errorCatcherTasks, getTasks, reorderTask} from "../../redux/list-reducer";
import {NavLink} from "react-router-dom";


const Task = (props) => {

    const removeTask = () => {

        let pagesCount = Math.ceil((props.totalTasksCount - 1) / props.pageSize);
        if (pagesCount === 0) {
            props.deleteTask(props.listId, props.taskId, 1, props.pageSize)
        }
        if ((props.currentPage > pagesCount) && (pagesCount !== 0)) {
            props.onPageChanged(props.currentPage - 1);
            props.deleteTask(props.listId, props.taskId, pagesCount, props.pageSize)
        }
        if ((props.currentPage <= pagesCount) && (pagesCount !== 0)) {
            props.deleteTask(props.listId, props.taskId, props.currentPage, props.pageSize)
        }

    }

    /*const f1 = async currentPage => {
        /!*debugger*!/
       let resultat = await props.getTasks(props.listId, currentPage, props.pageSize)
        return resultat
    };*/

    /*const f2 = async (newCurrent, currentPage, newArray) => {
        /!*debugger*!/
        await props.reorderTask(props.listId, props.id, newArray.items[newCurrent].id, currentPage, props.pageSize)
    };*/

    let onClickReorder = () => {
        let currentId = props.tasksOfCurrentList.findIndex(e => e.id === props.id)
        let newCurrent = currentId + 1;

        if (newCurrent === 10) {
            newCurrent = 0;
            let currentPage = props.currentPage + 1;
            /*props.getTasks(props.listId, currentPage, props.pageSize)
                .then(console.log(props.tasksOfCurrentList))*/
            /*debugger*/
            /*let newArray = await f1(currentPage);

            await f2(newCurrent, currentPage, newArray)*/
            props.getTasks(props.listId, currentPage, props.pageSize).then(
                data => {
                    props.reorderTask(props.listId, props.id, data.items[newCurrent].id, currentPage, props.pageSize)
                }
            )

            /*let promise = props.reorderTask(props.listId, props.id, props.tasksOfCurrentList[newCurrent].id, currentPage, props.pageSize)*/

            /*Promise.all([promise])
                .then(() => {
                    props.reorderTask(props.listId, props.id, promise.items[newCurrent].id, currentPage, props.pageSize)
            })*/

            /*.then(props.reorderTask(props.listId, props.id, props.tasksOfCurrentList[newId].id, currentPage, props.pageSize))*/
        } else {
            try {
                props.reorderTask(props.listId, props.id, props.tasksOfCurrentList[newCurrent].id, props.currentPage, props.pageSize)
            } catch (error) {

                props.errorCatcher(true)
            }


        }


    }


    /*let [opened, setOpening] = useState(false)

    let open = () => {
        setOpening(true)
    }
    let close = () => {
        setOpening(false)
    }*/
    console.log(props.description)
    return (
        <div className={styles.taskFullBlock}>
            {/*<NavLink to={`/todo-list/${props.listId}/task/${props.id}`}>*/}


            <div className={styles.taskBackground} onClick={() => {
                props.open(props.taskId, props.title, props.description, props.completed, props.status, props.priority, props.startDate, props.deadline)
            }}>
            </div>
            {/*</NavLink>*/}
            <div className={styles.block}>
                <span className={styles.title}>
            {/*{props.title}*/}
                    {props.title}
                </span>
                <div className={styles.description}>
                    {/*{props.description.length > 50 ? props.description.slice(0, 50) : 'нет описания'}*/}
                    {props.description ? (props.description.length > 30 ? (props.description.slice(0, 30) + '...') : props.description)
                        : 'нет описания'}

                </div>
            </div>

            {/*<button onClick={()=> {props.deleteTask(props.listId, props.taskId, props.currentPage, props.pageSize)}}>Удалить таску</button>*/}
            <div className={styles.btn}>
                <div className={styles.btnRemove}>
                    <button className={styles.form__button} onClick={removeTask}>Удалить таску</button>
                </div>
                <div className={styles.btnClick}>
                    <button className={styles.form__button} onClick={() => {
                        onClickReorder()
                    }}>Вниз
                    </button>
                </div>
                {/*<div>
                            <button onClick={() => {
                                props.open(props.taskId)
                            }}>Открыть
                            </button>
                        </div>*/}
            </div>


            {/*<div>
                    {props.title}
                    {props.description ? props.description : 'Нет описания'}
                    {props.addedDate}
                </div>*/}
            {/*<div>
                    <button onClick={() => {
                        props.close()
                    }}>Закрыть
                    </button>
                </div>*/}


        </div>
    )
}

export default Task