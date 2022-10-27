import styles from "./Paginator.module.css";
import React from "react";


export let Paginator = (props) => {

    let pagesCount = Math.ceil(props.totalTasksCount / props.pageSize);
    let pages = [];
    for (let i=1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let curP = props.currentPage;
    let curPF = ((curP - 5) < 0) ?  0  : curP - 5 ;
    let curPL = curP + 5;
    let slicedPages = pages.slice( curPF, curPL);
    console.log(slicedPages.length)
    console.log(curPF);


    return (
        <div>
            {  slicedPages.map((page) => {
                return (
                    <button onClick={() => {props.onPageChanged(page)}} className={props.currentPage === page ? styles.selectedPage : ""}>{page}</button>
                )
            })}
        </div>
    )
}