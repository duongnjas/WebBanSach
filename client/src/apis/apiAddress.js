import { BASE_URL, handleResponse } from "./apiconfig";

const apiAddress = {
    getUserAddress: async (param) => {
        const response = await fetch(
            `${BASE_URL}/users/address/${param}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
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
export default apiAddress;