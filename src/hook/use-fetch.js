import {useState, useCallback, useContext} from 'react';
import REST_PATH from "../api/rest_path";
import AuthContext from "../store/auth-context";

const useFetch = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const authCtx = useContext(AuthContext);

    const sendRequest = useCallback(async (requestConfig, applyData) => {
        setIsLoading(true);
        setError(null);

        if (!requestConfig.headers) {
            requestConfig.headers = {};
        }

        if (authCtx.isLoggedIn) {
            requestConfig.headers['Authorization'] = authCtx.requestToken;
        }
        
        const APIAddress = REST_PATH + requestConfig.url;
        try {
            const response = await fetch(APIAddress, {
                method: requestConfig.method ? requestConfig.method : 'GET',
                headers: requestConfig.headers,
                body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
            });

            if (!response.ok) {
                throw new Error(await response.text());
            }

            const responseText = await response.text();
            let data = responseText === "" ? {} : JSON.parse(responseText);
            applyData(data);
        } catch (error) {
            setError(error.message || 'Something went wrong.');
        }
        setIsLoading(false);
    }, [authCtx]);


    return {
        isLoading,
        error,
        sendRequest,
    };
};

export default useFetch;