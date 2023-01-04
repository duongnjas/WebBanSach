// import {  axiosClientWithToken} from "./axiosClient";
import { BASE_URL, handleResponse } from "./apiconfig";

const apiProfile = {

    // putChangePassword: async (params, id) => {
    //     const response = await fetch(
    //         `${BASE_URL}/users/${id}`,
    //         {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(params),
    //         }
    //     );
    //     return handleResponse(response);
    // },
    putChangeInfo: async (params, id) => {
        const response = await fetch(
            `${BASE_URL}/users/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            }
        );
        return handleResponse(response);
    },
    getUserProfile: async (id) => {
        const response = await fetch(
            `${BASE_URL}/users/${id}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return handleResponse(response);
    },
    putChangePassword: async (param, id) => {
        const response = await fetch(
            `${BASE_URL}/users/${id}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(param),
            }
        );
        return handleResponse(response);
    },
}
    
export default apiProfile;