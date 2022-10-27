 import React, {useState} from 'react';
 import styles from './GeneralList.module.css'
 import {errorCatcherList, errorCatcherLists, errorCatcherTasks, reorderList} from "../../redux/list-reducer";
 import {NavLink} from "react-router-dom";
 import TitleListWithHooks from "./TitleListWithHooks";
 import st from './Tasks.module.css';

 const List = (props) => {

//     const [blocks, setBlock] = useState(props.listsData);
//
//     const [currentBlock, setCurrentBlock] = useState(null)
//
//     let dragStartHandler = (e, block) => {
//         console.log('drag', block)
//         setCurrentBlock(block)
//     }
//
//     const dragEndHandler = e => {
//         e.target.style.background = 'white'
//     };
//
//     const dragOverHandler = e => {
//         e.preventDefault()
//         e.target.style.background = 'lightgrey'
//
//     };
//
//     const dropHandler = (e, block) => {
//         e.preventDefault()
//         console.log('drag', block)
//         setBlock(block.map(c => {
//             if (c.id === block.id) {
//                 return {...c, order: currentBlock.order}
//             }
//             if (c.id === currentBlock.id) {
//                 return {...c, order: block.order}
//             }
//             return c
//         }))
//         e.target.style.background = '';
//     };
//
//     const sortBlocks = (a, b) => {
//         if (a.order > b.order) {
//             return 1
//         } else {
//             return -1
//         }
//     }
//
//
//     /*draggable={true}
//     onDragStart={(e) => dragStartHandler(e, props.block)} onDragLeave={(e) => dragEndHandler(e)}
//     onDragEnd={(e) => dragEndHandler(e)} onDragOver={(e) => dragOverHandler(e)}
//     onDrop={(e) => dropHandler(e, props.block)}*/
//
     /*const currentId = props.listsData.indexOf(props.listsData.map)*/
     /*const currentId = props.listsData.findIndex(e => e.id === props.id)*/
     /*console.log(currentId)*/
     /*const newCurrent = currentId-1;*/


     let onClickCount = () => {

         try {
             const currentId = props.listsData.findIndex(e => e.id === props.id)
             const newCurrent = currentId+1;
             props.reorderList(props.id, props.listsData[newCurrent].id)
          } catch (errors) {
              debugger
             props.errorCatcher(true)
          }

     }

     /*<div>
         <NavLink to={`/todo-list/${props.id}`}>
             <div className={styles.block}>
             </div>
         </NavLink>
     </div>*/


     return (
         <div className={styles.fullBlock}>
             <NavLink to={`/todo-list/${props.id}`}>
                 <div className={styles.block}>
                 </div>
             </NavLink>
             <div className={styles.buttons_1}>
                 <TitleListWithHooks id={props.id} listTitle={props.listTitle} updateListTitle={props.updateListTitle} title={props.title} />
             </div>
             <div className={styles.buttons_2}>
                 <button className={st.form__button + ' ' + styles.btn_1} onClick={() => { props.deleteList(props.id) }}>delete</button>
                 <button className={st.form__button} onClick={() => {onClickCount()}}>Вниз</button>
             </div>

         </div>

   )
}

export default List;
