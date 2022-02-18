import React, {useState} from 'react';

const AuthContext = React.createContext({
    sessionCookie: '',
    isLoggedIn: false,
    login: (authToken) => {},
    logout: () => {}
});

export const AuthContextProvider = (props) => {
    const [authToken, setAuthToken] = useState(null);

    const userIsLoggedIn = !!authToken;

    const loginHandler = (authToken) => {
        setAuthToken(authToken);
    }

    const logoutHandler = () => {
        setAuthToken(null);
    }

    const contextValue = {
        authToken: authToken,
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

