import logo from './logo.svg';
import './App.css';
import {BrowserRouter, HashRouter, Navigate, Route, Routes} from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer";
import TodolistContainer from "./components/Todolists/TodolistContainer";
import NavbarContainer from "./components/Navbar/NavbarContainer";
import Login from "./components/Login/Login";
import TodolistTaskContainer from "./components/Todolists/TodolistTaskContainer";
import TaskEditor from "./components/Todolists/TaskEditor";
import Tasks from "./components/Todolists/TodolistTask";


const App = () => {
    return (
        <BrowserRouter>
            <div className={'mainWrapper'}>
                <div className={'fullScreen'}>
                    <div className='app-wrapper'>
                        {/*<HeaderContainer/>*/}
                        <NavbarContainer/>
                        <div className='app-wrapper-content'>
                            <Routes>
                                <Route path='/login' element={<Login />} />
                                <Route path='/todo-list/:listId' element={<TodolistTaskContainer />} />
                                <Route path='/todo-list/' element={<TodolistContainer />} />
                                {/*<Route path='/todo-list/:listId/task/:taskId' element={<TaskEditor />} />*/} {/*Если что убрать!*/}
                                <Route path='/todo-list/:listId/task/:taskId' element={<Tasks />} />
                                <Route path='*' element={<Login />} />
                            </Routes>
                        </div>
                    </div>
                </div>

            </div>

        </BrowserRouter>
    );
}

export default App;
