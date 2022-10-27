import React from "react";
import {connect} from "react-redux";
import {
    changeTextOfTaskTitle,
    createTask,
    deleteTask, errorCatcher, errorCatcherTasks,
    getTasks,
    reorderTask,
    setCurrentPage, setStartDate, takeTaskId, updateTask
} from "../../redux/list-reducer";
import {compose} from "redux";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import Tasks from "./TodolistTask";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";



export function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                match={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}


class TodolistTaskContainer extends React.Component {

    refreshProfile () {

        let listId = this.props.match.params.listId;
        this.props.getTasks(listId, 1, this.props.pageSize);
        this.props.errorCatcher(false)
        /*let taskId = this.props.match.params.taskId;*/
    }


    componentDidMount() {
        this.refreshProfile()

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.listId !== prevProps.match.params.listId) {
            this.refreshProfile()
        }
        if (this.props.taskData !== prevProps.taskData) {
            /*this.refreshProfile()*/
            let listId = this.props.match.params.listId;
            this.props.getTasks(listId, this.props.currentPage, this.props.pageSize);
            this.props.errorCatcher(false)
        }
    }

    onPageChanged (numberOfCurrentPage) {
        /*let listId = this.props.match.params.listId;*/

        this.getTasks(this.listId, numberOfCurrentPage, this.pageSize)
    }


    render() {
        return (
            <Tasks listId={this.props.match.params.listId} {...this.props} onPageChanged={this.onPageChanged} currentPage={this.props.currentPage}
                   taskData={this.props.taskData}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        tasksOfCurrentList: state.list.tasksOfCurrentList,
        taskTitleText: state.list.taskTitleText,
        pageSize: state.list.pageSize,
        currentPage: state.list.currentPage,
        totalTasksCount: state.list.totalTasksCount,
        nextTasksOfCurrentList: state.list.nextTasksOfCurrentList,
        errors: state.list.errors,
        idOfTask: state.list.idOfTask,
        taskData: state.list.taskData,
        startData: state.list.startData,

    }
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {createTask, changeTextOfTaskTitle, getTasks, deleteTask, setCurrentPage, reorderTask, errorCatcher, takeTaskId,
        updateTask, setStartDate}),
    withRouter
)(TodolistTaskContainer)