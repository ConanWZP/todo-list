import React from "react";
import {Field, reduxForm} from "redux-form";

import {maxLengthCreator, required} from "../../utils/validators/validators";
import {Element} from "../Common/FormsControls/FormsControls";
import {connect} from "react-redux";
import {login, logout} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";
import styles from './../Common/FormsControls/FormsControls.module.css'

const Input = Element('input');

const LoginForm = (props) => {



    return (
        <form onSubmit={props.handleSubmit}>

            <div>
                <Field placeholder={'Email'} name={'email'} component={Input} validate={[required, maxLengthCreator(30)]} />
            </div>
            <div>
                <Field placeholder={'Password'} name={'password'} type={'password'} component={Input} validate={[required, maxLengthCreator(15)]} />
            </div>
            <div>
                <Field type={'checkbox'} name={'rememberMe'} component={Input} /> remember me
            </div>
            { props.error && <div className={styles.formConclusionError}>
                {props.error}
            </div>
            }
            {props.captchaURL && <img src={props.captchaURL} />}
            {props.captchaURL && <Field name={'captcha'} component={Input} validate={[required]} />}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}


const LoginReduxForm = reduxForm({

    form: 'login'
})(LoginForm)




const LoginPage = (props) => {

    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return <Navigate to={'/todo-list'} />
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaURL={props.captchaURL} />
        </div>
        )
}

let mapStateToProps = (state) => {
    return {
        captchaURL: state.auth.captchaURL,
        isAuth: state.auth.isAuth,
    }
}

export default connect(mapStateToProps, {login, logout})(LoginPage);