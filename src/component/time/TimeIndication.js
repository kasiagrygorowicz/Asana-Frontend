import React from 'react';

function TimeIndication({time}) {

    return (
        <>
            {Math.floor(time / 3600) > 0 &&
                <><span>{("0" + Math.floor(time / 3600)).slice(-2)}</span>h:</>
            }
            {Math.floor(time / 60 % 60) > 0 &&
                <><span>{("0" + Math.floor(time / 60 % 60)).slice(-2)}</span>m:</>
            }
            <><span>{("0" + Math.floor(time % 60)).slice(-2)}</span>s</>
        </>
    );
}

export default TimeIndication;