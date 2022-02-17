import REST_PATH from "./rest_path";

const register_request =(email,password,name)=>{


    const { isLoading, error, sendRequest: registerRequest } = useFetch();

    const handleRegistration = (response) => {
        console.log(response);
    }

    const RegisterRequestContent = {
        url: "register",
        method: "POST",
        body: {
            'email': email,
            'password': password,
            'name' :name
        },
        headers: {
            'Content-Type': 'application/json'
        }
    };
}

export default register_request;