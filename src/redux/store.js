import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";


let store = {
    _state: {
        profilePage: {
            postsData: [
                {userId: 1, message: 'Hi, how are you?', like: 15},
                {userId: 2, message: 'First-post', like: 22},
            ],
            newPostText: ''
        },
        dialogsPage: {
            dialogsData: [
                {userId: 1, userName: 'Dmitry'},
                {userId: 2, userName: 'Andrey'},
                {userId: 3, userName: 'Bogdan'},
                {userId: 4, userName: 'Vital'},
                {userId: 5, userName: 'Viktor'},
                {userId: 6, userName: 'Sasha'},
            ],
            messagesData: [
                {userId: 1, message: 'Hi'},
                {userId: 2, message: 'How are you?'},
                {userId: 3, message: 'Jo'},
                {userId: 4, message: 'Textik'},
                {userId: 5, message: 'Mes'},
            ],
            newMessageText: '',
        },
        sideBar: {
            friendListData: [
                {userId: 1, userName: 'Dmitry'},
                {userId: 2, userName: 'Andrey'},
                {userId: 3, userName: 'Bogdan'},
            ],
        },

    },
    _callSubscriber ()  {
        console.log('State changed');
    },

    getState () {
        return this._state;
    },
    subscribe (observer) {
        this._callSubscriber = observer;
    },


    /*addPost () {
        let newPost = {
            userId: 5,
            message: this._state.profilePage.newPostText,
            like: 0,
        };
        this._state.profilePage.postsData.push(newPost);
        this._state.profilePage.newPostText = '';
        this._callSubscriber(this._state)
    },*/
    /*updateNewPostText (newText) {
        this._state.profilePage.newPostText = newText;
        this._callSubscriber(this._state);
    },*/
    /*submitMessage () {
        let newMessage = {
            userId: 8,
            message: this._state.dialogsPage.newMessageText,
        }
        this._state.dialogsPage.messagesData.push(newMessage);
        this._state.dialogsPage.newMessageText = '';
        this._callSubscriber(this._state);
    },*/
    /*updateNewMessageText (newMessage) {
        this._state.dialogsPage.newMessageText = newMessage;
        this._callSubscriber(this._state);
    },*/



    dispatch (action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sideBar = sidebarReducer(this._state.sideBar, action);
        this._callSubscriber(this._state);

    }
}




export default store

window.store = store;

// store - OOP