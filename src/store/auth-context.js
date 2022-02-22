import React, {useState} from 'react';

const AuthContext = React.createContext({
    authToken: '',
    requestToken: '',
    isLoggedIn: false,
    login: (authToken) => {},
    logout: () => {}
});

const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();

    const remainingTime = adjExpirationTime - currentTime;
    return remainingTime;
}

export const AuthContextProvider = (props) => {
    const initialAuthToken = localStorage.getItem("authToken");
    const [authToken, setAuthToken] = useState(initialAuthToken);

    const userIsLoggedIn = !!authToken;
    const requestToken = 'Bearer ' + authToken;

    const loginHandler = (authToken) => {
        setAuthToken(authToken);
        localStorage.setItem("authToken", authToken);
        // const remainingTime = calculateRemainingTime(expirationTime);
        // setTimeout(logoutHandler, remainingTime);
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

