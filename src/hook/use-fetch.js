import { useState, useCallback } from 'react';

const useFetch = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback(async (requestConfig, applyData) => {
        setIsLoading(true);
        setError(null);
        const uri = "http://localhost:8080";
        const APIAddress = uri + requestConfig.url;
        try {
            const response = await fetch(APIAddress, {
                method: requestConfig.method ? requestConfig.method : 'GET',
                headers: requestConfig.headers ? requestConfig.headers : {},
                body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
            });
            if (!response.ok) {
                throw new Error('Request failed.');
            }
            let data = response.json();
            applyData(data);
        } catch (error) {
            setError(error.message || 'Something went wrong.');
        }
        setIsLoading(false);
    }, []);

    return {
        isLoading,
        error,
        sendRequest,
    };
};

export default useFetch;