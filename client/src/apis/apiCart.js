import { BASE_URL, handleResponse } from "./apiconfig";

const apiCart = {
    saveOrder: async (params) => {
        const response = await fetch(
            `${BASE_URL}/orders/create`,
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
    changeTypeOrder: async (params, id) => {
        const response = await fetch(
            `${BASE_URL}/orders/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params)
            }
        );
        return handleResponse(response);
    },
    getAllOrders: async () => {
        const response = await fetch(
            `${BASE_URL}/orders/`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return handleResponse(response);
    },

    getOrders: async (params) => {
        const response = await fetch(
            `${BASE_URL}/orders/${params}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return handleResponse(response);
    },
    getOrderById: async (params) => {
        const response = await fetch(
            `${BASE_URL}/orders/get/${params}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return handleResponse(response);
    },
    
}
export default apiCart;