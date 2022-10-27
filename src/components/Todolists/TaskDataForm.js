import {Field, FieldArray, Fields, reduxForm} from "redux-form";
import styles from "./Tasks.module.css";
import React from "react";
import {Element} from "../Common/FormsControls/FormsControls";
import {setStartDate} from "../../redux/list-reducer";

const Input = Element('input');
const Textarea = Element('textarea');

const TaskDataForm = (props) => {

    const firstDate = React.createRef()

    const onChangeStartDate = () => {
        const dateControl = document.querySelector('input[type="datetime-local"]');
        console.log(dateControl.value)
        props.setStartDate(dateControl.value)
    }

    const onClickFirst = () => {
        const minus = document.getElementById('minus')

        minus.nextElementSibling.stepDown();
        minus.nextElementSibling.onChange();
    }
    const onClickSecond = () => {
        const plus = document.getElementById('plus')
        plus.nextElementSibling.stepUp();
        plus.nextElementSibling.onChange();
    }

    return (
        <form className={styles.taskInfo} onSubmit={props.handleSubmit}>
            <div className={styles.centring}>

                <div className={styles.form__group}>
                    <Field className={styles.form__input_mode} name={'title'} component={'input'} placeholder=' '/>
                    {/*<input className={styles.form__input} />*/}
                    <label className={styles.form__label}>TITLE</label>
                </div>
                <div className={styles.textareaText}>Описание:<Field className={styles.textareaField}
                                                                     name={'description'} component={Textarea}/></div>
            </div>
            <div className={styles.fields}>
                <div className={styles.form__group__ver}>
                    Статус:<Field className={styles.form__input} name={'status'} component={Input} type={'number'}
                                  min={0} max={2}/>
                </div>
                <div className={styles.form__group__ver}>
                    Приоритет:<Field className={styles.form__input} name={'priority'} component={Input} type={'number'}
                                     min={1} max={3}/>
                </div>
                {/*<span className={styles.centring}>Приоритет:<Field name={'priority'} component={Input} type={'number'}
                                                                   min={1} max={3}/></span>*/}
                <span className={styles.centring}>Дата начала:<Field className={styles.form__input}
                                                                     onChange={onChangeStartDate} ref={firstDate}
                                                                     name={'startDate'} component={Input}
                                                                     type={'datetime-local'}/></span>
                <span className={styles.centring}>Дата окончания:<Field className={styles.form__input} name={'deadline'}
                                                                        component={Input} type={'datetime-local'}
                                                                        min={props.startData}/></span>
            </div>


            <div className={styles.downField}>
                {/*<div className={styles.checkbox_group}>
                    <Field component={'input'} name={'completed'} type="checkbox" className={styles.checkbox} id="checkbox"/>
                    <label htmlFor="checkbox" className={styles.checkbox_label}></label>
                </div>*/}
                {/*<span className={styles.checkbox_span}>Завершено:<Field name={'completed'} component={Input} type={'checkbox'}/></span>*/}
                <button className={styles.form__button}>Save</button>
            </div>
            <div>
                Статусы: 0 - не начато; 1 - в процессе; 2 - завершенно.
            </div>
            <div>
                Приоритеты: 1 - высокий; 2 - средний; 3 - низкий.
            </div>

        </form>
    )
}

export const TaskDataReduxForm = reduxForm({

    form: 'edit-task',
    enableReinitialize: true,
    destroyOnUnmount: false
})(TaskDataForm)

export default TaskDataReduxForm