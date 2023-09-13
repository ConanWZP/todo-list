import axios from "axios";
import task from "../components/Todolists/Task";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    data: '',
    headers: {
        "API-KEY" : "6b4d3903-1938-4216-beb6-ef50f7d87025"
    }
})


export const authAPI = {
    getAuthData () {
        return instance.get(`auth/me`)
            .then(response => {
                return response.data
            })
    },
    login (email, password, rememberMe=false, captcha=null) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha})
            .then(response => {
                return response.data
            })
    },
    logout () {
        return instance.delete(`auth/login`)
            .then(response => {
                return response.data
            })
    },
    getCaptcha () {
        return instance.get(`security/get-captcha-url`)
            .then(response => {
                return response.data
            })
    }
}



// ДРУГОЙ URL
const newInstance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    data: '',
    headers: {
        "API-KEY" : "683aa7c1-ffe3-45e5-bd9a-f2c1d86ca661"
    }
})

export const todolistAPI = {
    getLists () {

        return newInstance.get(`todo-lists`)
            .then(response => {
                return response.data
            })
    },
    createList (title) {
        return newInstance.post(`todo-lists`, {title})
            .then(response => {
                return response.data
            })
    },
    deleteList (id) {
        return newInstance.delete(`todo-lists/${id}`)
            .then(response => {
                return response.data
            })
    },
    reorderList (id, prevId) {
        return newInstance.put(`todo-lists/${id}/reorder`, {putAfterItemId: prevId})
            .then(response => {
                return response.data
            })
    },
    getTasks (id, currentPage, pageSize) {

        return newInstance.get(`todo-lists/${id}/tasks?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    createTask (id, title) {
        return newInstance.post(`todo-lists/${id}/tasks`, {title})
            .then(response => {
                return response.data
            })
    },
    deleteTask (listId, taskId) {
        return newInstance.delete(`todo-lists/${listId}/tasks/${taskId}`)
            .then(response => {
                return response.data
            })
    },
    reorderTask (listId, taskId, prevTaskId) {
        return newInstance.put(`todo-lists/${listId}/tasks/${taskId}/reorder`, {putAfterItemId: prevTaskId})
            .then(response => {
                return response.data
            })
    },
    updateTask (listId, taskId, taskInfo) {
        return newInstance.put(`todo-lists/${listId}/tasks/${taskId}`, taskInfo)
            .then(response => {
                return response.data
            })
    },
    updateListTitle (listId, listTitle) {
        return newInstance.put(`todo-lists/${listId}`, {title: listTitle})
            .then(response => {
                return response.data
            })
    }
}
