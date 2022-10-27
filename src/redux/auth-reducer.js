import {authAPI} from "../API/api";
import {stopSubmit} from "redux-form";

const SET_AUTH_USER_DATA = 'SET-AUTH-USER-DATA';
const GET_CAPTCHA_SUCCESS = 'GET-CAPTCHA-SUCCESS'

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaURL: null
}

const authReducer = (state=initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
            return {
                ...state,
                userId: action.userId,
                email: action.email,
                login: action.login,
                isAuth: action.isAuth
            }
        case GET_CAPTCHA_SUCCESS:
            return {
                ...state,
                captchaURL: action.captchaURL
            }

        default: return state
    }

}


export const setAuthUserData = (userId, email, login, isAuth) => {
    return {
        type: SET_AUTH_USER_DATA,
        userId,
        email,
        login,
        isAuth,
    }
}


export const getAuthUserData = () => {
    return async (dispatch) => {
        let data = await authAPI.getAuthData()
        if (data.resultCode ===0) {
            let {id, email, login} = data.data;
            dispatch(setAuthUserData(id, email, login, true))
        }
    }
}

export const login = (email, password, rememberMe, captcha) => {
    return async (dispatch) => {
        let data = await authAPI.login(email, password, rememberMe, captcha)
        if (data.resultCode ===0) {
            dispatch(getAuthUserData())
        } else {
            if (data.resultCode ===10) {
                dispatch(getCaptchaUrl())
            }
            let message = data.messages.length > 0 ? data.messages[0] : 'Some error'
            dispatch(stopSubmit('login', {_error: message}))
        }
    }
}

export const logout = () => {
    return async (dispatch) => {
        let data = await authAPI.logout()
        if (data.resultCode ===0) {
            dispatch(setAuthUserData(null, null, null, false))
        }
    }
}





export const getCaptchaSuccess = (captchaURL) => {
    return {
        type: GET_CAPTCHA_SUCCESS,
        captchaURL
    }
}

export const getCaptchaUrl = () => {
    return async (dispatch) => {
        let data = await authAPI.getCaptcha();
        dispatch(getCaptchaSuccess(data.url))
    }
}

export default authReducer