import React, {useState} from "react";
import {connect} from "react-redux";
import {
    addList,
    changeTextOfPost,
    createList,
    deleteList, errorCatcher, errorCatcherLists, errorCatcherTasks,
    getLists,
    reorderList, updateListTitle
} from "../../redux/list-reducer";
import List from "./List";
import styles from './GeneralList.module.css'
import {NavLink} from "react-router-dom";
import styl from './Tasks.module.css';
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";



class TodolistContainerClass extends React.Component {

    componentDidMount() {
        this.props.getLists();
        this.props.errorCatcher(false)
    }



    render() {
        return (
            <TodolistContainer {...this.props} />
        )
    }
}


const TodolistContainer = (props) => {

    const addPost = () => {
        let text = props.constText;
        props.createList(text);
        props.changeTextOfPost('');
    }

    const onChangeText = () => {
        let text = newPostText.current.value;
        props.changeTextOfPost(text);
    }

    const newPostText = React.createRef();
    /*debugger*/



    const listElement = props.listsData.map(block => {
        return (
            <List title={block.title} id={block.id} {...props} block={block} order={block.order} listsData={props.listsData} />
        )
    });

    let [newPost, setNewPost] = useState(false);



    /*const [blocks, setBlock] = useState(props.listsData);

    const [currentBlock, setCurrentBlock] = useState(null)

    let dragStartHandler = (e, block) => {
        console.log('drag', block)
        setCurrentBlock(block)
    }

    const dragEndHandler = e => {
        e.target.style.background = 'white'
    };

    const dragOverHandler = e => {
        e.preventDefault()
        e.target.style.background = 'lightgrey'

    };

    const dropHandler = (e, block) => {
        e.preventDefault()
        console.log('drag', block)
        setBlock(blocks.map(c => {
            if (c.id === block.id) {
                return {...c, order: currentBlock.order}
            }
            if (c.id === currentBlock.id) {
                return {...c, order: block.order}
            }
            return c
        }))
        e.target.style.background = '';
    };

    const sortBlocks = (a, b) => {
        if (a.order > b.order) {
            return 1
        } else {
            return -1
        }
    }*/



    return (
        <div className={styles.main}>
            <div className={styles.elements}>
                {/*{props.listsData.sort(sortBlocks).map(block =>*/}
                {/*    <div className={styles.block} draggable={true}*/}
                {/*      onDragStart={(e) => dragStartHandler(e, block)} onDragLeave={(e) => dragEndHandler(e)}*/}
                {/*      onDragEnd={(e) => dragEndHandler(e)} onDragOver={(e) => dragOverHandler(e)}*/}
                {/*      onDrop={(e) => dropHandler(e, block)}>*/}
                {/*    <span>{block.title}</span>*/}
                {/*    <button onClick={() => { props.deleteList(block.id) }}>delete</button>*/}
                {/*    <button onClick={()=> {props.deletePost(props.id)}}>Delete post</button>*/}
                {/*</div>)}*/}
                {listElement}
                
            </div>
            {/*<div>
                <button onClick={addPost}>Add post</button>
            </div>*/}
            {/*<div>

                <textarea ref={newPostText} value={props.constText} onChange={onChangeText} />
            </div>*/}
            {newPost && <div className={styles.btnKa_mode}>
                <textarea className={styles.textareaField} placeholder={'Введите заголовок'} ref={newPostText} value={props.constText}
                          onChange={onChangeText}/>
                <button className={styl.form__button_mode + ' ' + styles.btnMargin} onClick={addPost}>Add post</button>
                <button className={styl.form__button_mode} onClick={() => {
                    setNewPost(false)
                }}>Завершить добавление листов
                </button>
            </div>}
            {!newPost && <div className={styles.btnKa}>
                <button className={styl.form__button_mode} onClick={() => {
                    setNewPost(true)
                }}>Добавить пост
                </button>
            </div>}
            {props.errors && <div className={styles.errors}>Ошибка</div>}


        </div>
    )
}


let mapStateToProps = (state) => {
    return {
        constText: state.list.constText,
        listsData: state.list.listsData,
        errors: state.list.errors,
        listTitle: state.list.listTitle
    }
}

/*export default connect(mapStateToProps, {
    createList,
    changeTextOfPost,
    addList,
    getLists,
    deleteList,
    reorderList,
    errorCatcher,
    updateListTitle
})(TodolistContainerClass)*/

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {createList, changeTextOfPost, addList, getLists, deleteList, reorderList, errorCatcher, updateListTitle})
)
(TodolistContainerClass)