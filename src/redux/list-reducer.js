import {todolistAPI} from "../API/api";

const ADD_LIST = 'ADD-LIST';
const CHANGE_TEXT_OF_POST = 'CHANGE-TEXT-OF-POST';
const ADD_TASKS = 'ADD-TASKS';
const CHANGE_TEXT_OF_TASK_TITLE = 'CHANGE-TEXT-OF-TASK-TITLE';
const SET_TOTAL_TASKS_COUNT = 'SET-TOTAL-TASKS-COUNT';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
/*const ADD_EXTRA_TASKS = 'ADD-EXTRA-TASKS'*/
const ERROR_CATCHER_TASKS = 'ERROR-CATCHER-TASKS';
const ERROR_CATCHER_LISTS = 'ERROR-CATCHER-LISTS';
const ERROR_CATCHER = 'ERROR-CATCHER';
const TAKE_TASK_ID = 'TAKE-TASK-ID';
const SET_START_DATE = 'SET-START-DATE';
const SET_LIST_TITLE = 'SET-LIST-TITLE'


let initialState = {
    listsData: [],
    tasksOfCurrentList: [],
    nextTasksOfCurrentList: [],
    constText: '',
    taskTitleText: '',
    pageSize: 10,
    totalTasksCount: 0,
    currentPage: 1,
    errorsTasks: false,
    errorsLists: false,
    errors: false,


    /*idOfTask: '',
    title: '',
    description: '',
    completed: false,
    status: '',
    priority: '',
    startDate: '',
    deadline: ''*/
    taskData: {},
    startData: '',
    listTitle: '',
}

const listReducer = (state = initialState, action) => {

    switch (action.type) {

        case ADD_LIST:
            /*let newList = {
                title: action.title,
            }*/
            return {
                ...state,
                /*listsData: [...state.listsData, newList],*/
                listsData: action.massive
            }

        case CHANGE_TEXT_OF_POST:
            return {
                ...state,
                constText: action.newPostText,
            }
        case ADD_TASKS:
            return {
                ...state,
                tasksOfCurrentList: action.array
            }
        /*case ADD_EXTRA_TASKS:
            return {
                ...state,
                nextTasksOfCurrentList: action.array
            }*/
        case CHANGE_TEXT_OF_TASK_TITLE:

            return {
                ...state,
                taskTitleText: action.taskTitle,
            }
        case SET_TOTAL_TASKS_COUNT:
            return {
                ...state,
                totalTasksCount: action.totalTasks
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        /*case ERROR_CATCHER_TASKS:
            return {
                ...state,
                errorsTasks: action.errors
            }*/
        /*case ERROR_CATCHER_LISTS:
            return {
                errorsLists: action.errors
            }*/
        case ERROR_CATCHER:
            return {
                ...state,
                errors: action.errors
            }
        case TAKE_TASK_ID:
            return {
                ...state,
                taskData: action.data
            }
        case SET_START_DATE:
            return {
                ...state,
                startData: action.startData
            }
        case SET_LIST_TITLE:
            let foundIndex = state.listsData.findIndex(list => list.id === action.id)
            state.listsData[foundIndex].title = action.listTitle
            return {
                ...state,
                listsData: [...state.listsData]
            }

        default:
            return state
    }
}

export const addList = (massive) => {
    return {
        type: ADD_LIST,
        massive
    }
}


export const getLists = () => {
    return async (dispatch) => {
        let data = await todolistAPI.getLists()
        dispatch(addList(data))
        /*dispatch(setListTitle(data.title))*/

    }
}


export const createList = (title) => {
    return async (dispatch) => {
        let data = await todolistAPI.createList(title)
        dispatch(getLists())

    }
}

export const changeTextOfPost = (newPostText) => {
    return {
        type: CHANGE_TEXT_OF_POST,
        newPostText
    }
}

export const deleteList = (id) => {
    return async (dispatch) => {
        let data = await todolistAPI.deleteList(id)
        dispatch(getLists())
    }
}

export const reorderList = (id, prevId) => {
    return async (dispatch) => {
        let data = await todolistAPI.reorderList(id, prevId)
        if (data.resultCode === 0) {
            dispatch(getLists())
            //dispatch(errorCatcherList(false))
            /*dispatch(errorCatcherTasks(false))*/
            dispatch(errorCatcher(false))

        }

    }
}

/*export const errorCatcherLists = (errors) => {
    return {
        type: ERROR_CATCHER_LISTS,
        errors
    }
}*/

export const addTasks = (array) => {
    return {
        type: ADD_TASKS,
        array
    }
}

/*export const addExtraTasks = (array) => {
    return {
        type: ADD_EXTRA_TASKS,
        array
    }
}*/

export const setTotalTasksCount = (totalTasks) => {
    return {
        type: SET_TOTAL_TASKS_COUNT,
        totalTasks
    }
}

export const setCurrentPage = (currentPage) => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage
    }
}

export const getTasks = (id, currentPage, pageSize, profile = null) => {
    return async (dispatch) => {
        /*debugger*/

        dispatch(setCurrentPage(currentPage));
        let data = await todolistAPI.getTasks(id, currentPage, pageSize)
        dispatch(addTasks(data.items))
        dispatch(setTotalTasksCount(data.totalCount))
        /*dispatch(takeTaskId(profile.idOfTask, profile.title, profile.description,
        profile.completed, profile.status, profile.priority, profile.startDate, profile.deadline))*/
        /*let dataExtra = await todolistAPI.getTasks(id, currentPage+1, pageSize)
        dispatch(addExtraTasks(dataExtra.items))*/
        return data
    }
}

export const createTask = (id, title, currentPage, pageSize) => {
    return async (dispatch) => {

        let data = await todolistAPI.createTask(id, title)
        if (data.resultCode === 0) {
            dispatch(getTasks(id, currentPage, pageSize))
        }
    }
}

export const changeTextOfTaskTitle = (taskTitle) => {
    return {
        type: CHANGE_TEXT_OF_TASK_TITLE,
        taskTitle
    }
}


export const deleteTask = (listId, taskId, currentPage, pageSize) => {
    return async (dispatch) => {
        let data = await todolistAPI.deleteTask(listId, taskId)
        if (data.resultCode === 0) {
            dispatch(getTasks(listId, currentPage, pageSize))
        }
    }
}


export const reorderTask = (listId, taskId, prevTaskId, currentPage, pageSize) => {
    return async (dispatch) => {
        let data = await todolistAPI.reorderTask(listId, taskId, prevTaskId)
        if (data.resultCode === 0) {
            dispatch(getTasks(listId, currentPage, pageSize))
            //dispatch(errorCatcherTasks(false))
            dispatch(errorCatcher(false))


        }

    }
}

/*export const errorCatcherTasks = (errors) => {
    return {
        type: ERROR_CATCHER_TASKS,
        errors
    }
}*/

export const errorCatcher = (errors) => {
    return {
        type: ERROR_CATCHER,
        errors
    }
}


export const takeTaskId = (idOfTask, title, description, completed, status, priority, startDate, deadline) => {
    return {
        type: TAKE_TASK_ID,
        data: {
            idOfTask,
            title,
            description,
            completed,
            status,
            priority,
            startDate,
            deadline
        }

    }
}


export const updateTask = (listId, taskId, profile, currentPage, pageSize) => {
    return async (dispatch) => {
        debugger
        let data = await todolistAPI.updateTask(listId, taskId, profile)
        if (data.resultCode === 0) {
            dispatch(getTasks(listId, currentPage, pageSize, profile))
            dispatch(takeTaskId(data.data.item.id, data.data.item.title, data.data.item.description,
            data.data.item.completed, data.data.item.status, data.data.item.priority, data.data.item.startDate, data.data.item.deadline))
        }
    }
}


export const setStartDate = (startData) => {
    return {
        type: SET_START_DATE,
        startData
    }
}


export const setListTitle = (listTitle, id) => {
    return {
        type: SET_LIST_TITLE,
        listTitle,
        id
    }
}


export const updateListTitle = (listId, listTitle) => {
    return async (dispatch) => {
        let data = await todolistAPI.updateListTitle(listId, listTitle)
        dispatch(setListTitle(listTitle, listId))
    }
}

export default listReducer