import { BASE_URL, handleResponse } from "./apiconfig";
const apiAuth = {    
    postLogin: async (params) => {
        const response = await fetch(
            `${BASE_URL}/auth/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params)
            }
        );
        return handleResponse(response);
    },
    postRegister: async (params) => {
        const response = await fetch(
            `${BASE_URL}/users/register`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params)
            }
        );
        return handleResponse(response);
    },
}

export default apiAuth;