import React from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {compose} from "redux";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import {
    changeTextOfTaskTitle,
    createTask,
    deleteTask, errorCatcher,
    getTasks,
    reorderTask,
    setCurrentPage
} from "../../redux/list-reducer";
import list from "./List";


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


class TaskEditor extends React.Component {

        componentDidMount() {
            let a = this.props.currentPage;
            let listId = this.props.match.params.listId;
            let taskId = this.props.match.params.taskId;
            let smt = this.props.tasksOfCurrentList.filter(e => e.id === taskId);
            console.log(smt)
            console.log('mount')
        }

        // МБ ИСПОЛЬЗОЫВАТЬ .filter ????
    render() {
        console.log('render')
        let taskId = this.props.match.params.taskId;
        let smt = this.props.tasksOfCurrentList.filter(e => e.id === taskId);
            if (smt.length === 0) {
                return <Navigate to='/todo-list' />
            }
        return (
            <div>
                {smt[0].title}
                {smt[0].description ? smt[0].description : "нет описания"}
            </div>
        )
    }
}


let mapStateToProps = (state) => {
    return {
        tasksOfCurrentList: state.list.tasksOfCurrentList,
        currentPage: state.list.currentPage,
    }
}

export default compose(
    connect(mapStateToProps, {createTask, changeTextOfTaskTitle, getTasks}),
    withRouter
)
(TaskEditor)

