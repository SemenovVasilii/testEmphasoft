const SET_AUTH = "SET_AUTH"
const LOGOUT = "LOGOUT"
const SET_USERS = "SET_USERS"
const SET_EDIT_USER = "SET_EDIT_USER"


interface IUserState {
    isAuth: boolean;
    users: [];
    editUser: Record<string, never>;
}

interface IUserAction {
    type: string;
    payload?: any;
}

const defaultState: IUserState = {
    isAuth: false,
    users: [],
    editUser: {}
}

export const userReducer = (state: IUserState = defaultState, action: IUserAction): IUserState => {
    switch (action.type) {
        case SET_AUTH:
            return {
                ...state,
                isAuth: true
            }
        case LOGOUT:
            return {
                ...state,
                isAuth: false
            }
        case SET_USERS:
            return {
                ...state,
                users: action.payload
            }
        case SET_EDIT_USER:
            return {
                ...state,
                editUser: action.payload
            }
        default: {
            return state
        }
    }
}

export const SetAuth = () => ({ type: SET_AUTH })
export const Logout = () => ({ type: LOGOUT })
export const SetUsers = (data: []) => ({ type: SET_USERS, payload: data })
export const SetEditUser = (data: object) => ({ type: SET_EDIT_USER, payload: data })
