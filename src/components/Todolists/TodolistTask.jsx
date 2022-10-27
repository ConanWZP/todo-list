import React, {useState} from "react";
import {NavLink, useLocation, useNavigate, useParams} from "react-router-dom";
import List from "./List";
import Task from "./Task";
import {Paginator} from "../Common/Paginator/Paginator";
import styles from './Tasks.module.css'
import {reorderTask, takeTaskId} from "../../redux/list-reducer";
import TaskDataForm, {TaskDataReduxForm} from "./TaskDataForm";



const Tasks = (props) => {

    const addTask = () => {
        let text = props.taskTitleText;
        props.createTask(props.listId, text, 1, props.pageSize);
        props.changeTextOfTaskTitle('');
    }

    const onChangeText = () => {
        let text = titleOfTask.current.value;
        props.changeTextOfTaskTitle(text);
    }

    const titleOfTask = React.createRef();


    let [opened, setOpening] = useState(false)

    const open = (idOfTask, title, description, completed, status, priority, startDate, deadline) => {
        setOpening(true)
        props.takeTaskId(idOfTask, title, description, completed, status, priority, startDate, deadline);
        /*return (
            <div>Текст</div>
        )*/
    }
    let close = () => {
        setOpening(false)

    }



    const taskElement = props.tasksOfCurrentList.map(task => {
        return (
            <Task title={task.title} taskId={task.id} {...props} {...task} onPageChanged={props.onPageChanged}
                  description={task.description} reorderTask={props.reorderTask} getTasks={props.getTasks}
                  tasksOfCurrentList={props.tasksOfCurrentList}
                  nextTasksOfCurrentList={props.nextTasksOfCurrentList} open={open} close={close}
                  taskData={props.taskData}/>
        )
    });

    const openedElement = '';

    let smt = props.tasksOfCurrentList.filter(e => e.id === props.taskData.idOfTask);


    let [editMode, setEditMode] = useState(false)

    /*let submitTaskData = (formData) => {

        props.updateTask(props.listId, smt[0].id, formData, props.currentPage, props.pageSize)
            .then(() => {
                setEditMode(false)
            })
    }*/


    let submitTaskData = (formData) => {
        console.log(formData)
        props.updateTask(props.listId, props.taskData.idOfTask, formData, props.currentPage, props.pageSize)
            .then(() => {
                setEditMode(false)
            })
    }

    return (
        <div className={styles.tasksWrapper}>
            {!opened &&
                <div className={styles.helperDiv}>
                    <div>
                        <Paginator {...props} onPageChanged={props.onPageChanged} currentPage={props.currentPage} />
                    </div>
                    <div className={styles.tasks}>
                        {taskElement}

                        {/*{Object.keys(props.tasks.items.}*/}
                        {/*<textarea placeholder={'Введите заголовок'} ref={titleOfTask} value={props.taskTitleText}
                          onChange={onChangeText}/>*/}
                    </div>
                    {props.errors && <div className={styles.errors}>Ошибка</div>}
                    <div className={styles.dialogMenu}>
                <textarea placeholder={'Введите заголовок'} ref={titleOfTask} value={props.taskTitleText}
                          onChange={onChangeText}/>
                        <button onClick={addTask}>Добавить таску</button>
                    </div>
                </div>}
            {opened &&
                <div className={styles.openedTask}>

                    <div>
                        {/*{taskElement}*/}
                        {/*{editMode ?}*/}
                        {editMode ?
                        <TaskDataReduxForm {...props} smt={smt}  onSubmit={submitTaskData}  initialValues={props.taskData} />
                        :<TaskData {...props} smt={smt} goToEditMode={() => {setEditMode(true)}} />
                        }
                    </div>
                    <div>
                        <button className={styles.form__button_mode} onClick={() => {
                            close()
                        }}>Закрыть
                        </button>
                    </div>
                </div>}

        </div>
    )
}

const TaskData = (props) => {

    return (
        <div className={styles.taskInfo}>
            {/*<span className={styles.titleStyle}>{props.smt[0].title}</span>*/}
            {/*<span className={styles.sign_title}>Заголовок:</span>*/}
            <span className={styles.titleStyle}>{props.taskData.title}</span>
            {/*<span>{props.smt[0].description ? props.smt[0].description : 'Нет описания'}</span>*/}
            <span className={styles.sign_description}>Описание:</span>
            <div className={styles.description}>{props.taskData.description ? props.taskData.description : 'Нет описания'}</div>

            <div className={styles.status_and_priority}>
                {/*<span>Статус: {props.smt[0].status}</span>*/}
                <div className={styles.status}>Статус: <div>{props.taskData.status}</div></div>
                {/*<span>Приоритет: {props.smt[0].priority}</span>*/}
                <div className={styles.priority}>Приоритет: <div>{props.taskData.priority}</div></div>
            </div>

            <div className={styles.date_start_end}>
                {/*<span>Дата начала: {props.smt[0].startData}</span>*/}
                <div className={styles.date}>Дата начала: <div>{props.taskData.startDate}</div></div>
                {/*<span>Дата окончания: {props.smt[0].deadline}</span>*/}
                <div className={styles.date}>Дата окончания: <div>{props.taskData.deadline}</div></div>
            </div>
            {/*<span>Завершено: {props.smt[0].completed ? '+' : '-'}</span>*/}
            {/*<div className={styles.completed}>Завершено: {props.taskData.completed ? '+' : '-'}</div>*/}
            <div><button className={styles.form__button} onClick={props.goToEditMode}>Edit</button></div>
        </div>
    )
}




export default Tasks