import React, {useState} from 'react';

const AuthContext = React.createContext({
    sessionCookie: '',
    isLoggedIn: false,
    login: (sessionCookie) => {},
    logout: () => {}
});

export const AuthContextProvider = (props) => {
    const [sessionCookie, setSessionCookie] = useState(null);

    const userIsLoggedIn = !!sessionCookie;

    const loginHandler = (sessionCookie) => {
        setSessionCookie(sessionCookie);
    }

    const logoutHandler = () => {
        setSessionCookie(null);
    }

    const contextValue = {
        sessionCookie: sessionCookie,
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

