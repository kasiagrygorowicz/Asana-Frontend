import React, {useState} from 'react';
import jwt_decode from "jwt-decode";

const AuthContext = React.createContext({
    authToken: '',
    requestToken: '',
    isLoggedIn: false,
    login: (authToken) => {
    },
    logout: () => {
    }
});

export const AuthContextProvider = (props) => {
    const initialAuthToken = localStorage.getItem("authToken");
    const [authToken, setAuthToken] = useState(initialAuthToken);

    function isUserLoggedIn(authToken, setAuthToken) {
        if (!!authToken) {
            if (jwt_decode(authToken).exp * 1000 < new Date().getTime()) {
                localStorage.removeItem("authToken");
                setAuthToken(null);
            } else {
                return true
            }
        }
        return false
    }

    const userIsLoggedIn = isUserLoggedIn(authToken, setAuthToken);
    const requestToken = 'Bearer ' + authToken;

    const loginHandler = (authToken) => {
        setAuthToken(authToken);
        localStorage.setItem("authToken", authToken);
    }

    const logoutHandler = () => {
        setAuthToken(null);
        localStorage.removeItem("authToken");
    }

    const contextValue = {
        authToken: authToken,
        requestToken: requestToken,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>);
};

export default AuthContext;

