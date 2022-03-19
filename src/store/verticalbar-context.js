import React, {useState} from 'react';

const VerticalBarContext = React.createContext({
    updateKey: 0,
});


export const VerticalBarContextProvider = (props) => {
    const initialuUpdateKey = localStorage.getItem("key");
    const [updateKey, setNewKey] = useState(initialuUpdateKey);

    const contextValue = {
        updateKey: updateKey
    };

    return (
        <VerticalBarContext.Provider value={contextValue}>
            {props.children}
        </VerticalBarContext.Provider>);
};

export default VerticalBarContext;

