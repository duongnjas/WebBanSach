import { BASE_URL, handleResponse } from "./apiconfig";

const apiUser = {
    getUsers: async () => {
        const response = await fetch(
            `${BASE_URL}/users/`,
            {
                method: 'GET',
                redirect: 'follow',
            }
        );
        //console.log(handleResponse(response))
        return handleResponse(response);
    },
    removeUsers: async (param) => {
        const response = await fetch(
            `${BASE_URL}/users/${param}`,
            {
                method: 'DELETE',
                redirect: 'follow',
            }
        );
        //console.log(handleResponse(response))
        return handleResponse(response);
    },

    saveAddress: async (params) => {
        const response = await fetch(
            `${BASE_URL}/users/address`,
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

    deleteAddressById: async (params) => {
        const response = await fetch(
            `${BASE_URL}/users/address/${params}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return handleResponse(response);
    },

    updateUserAddressById: async (params, id) => {
        const response = await fetch(
            `${BASE_URL}/users/address/${id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            }
        );
        return handleResponse(response);
    },
}
export default apiUser;