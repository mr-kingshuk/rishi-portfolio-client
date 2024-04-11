import { createContext, useReducer } from "react";

export const AuthContext = createContext();

const ACTIONS = {
    'LOGIN': 'login',
    'LOGOUT': 'logout'
}

const authReducer = (state, action) => {
    switch(action.type){
        case ACTIONS.LOGIN:
            return { user : action.payload };
        case ACTIONS.LOGOUT:         
            return { user : null }
        default: return state;
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: JSON.parse(localStorage.getItem('userPort'))
    });

    return(
        <AuthContext.Provider value = {{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}
