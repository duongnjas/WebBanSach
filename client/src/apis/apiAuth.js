
import { axiosClient } from "./axiosClient";
const BASE_URL='http://localhost:5000/api/v1'
const handleResponse = async (response) => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}
const apiAuth = {
    // postLogin: async (params) => {
    //     const myLogin = await axiosClient.post('/auth/login', params)
    //     return myLogin.data;
    // },
    
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

    getUserBySocialToken: async (params) => {
        const myLogin = await axiosClient.get('/auth/social', {params})
        return myLogin.data;
    },

    search: async (params) => {
        const mySearch = await axiosClient.post('', params)
        return mySearch.data;
    },

    postCheckPhone: async (params) => {
        const checkPhone = await axiosClient.post('/auth/verification', params)
        return checkPhone.data
    },

    postRegister: async (params) => {
        const register = await axiosClient.post('/user/register', params)
        return register.data
    },
    resetPassword:async (params,token) => {
        const register = await axiosClient.post(`/auth/resetPassword/?token=${token}`, params)
        return register.data
    },
    forgetPassword:async (params) => {
        const register = await axiosClient.post(`/auth/forgetPassword`, params)
        return register.data
    }

}

export default apiAuth;