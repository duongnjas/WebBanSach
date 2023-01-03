import { BASE_URL, handleResponse } from "./apiconfig";

import axios from 'axios';
import queryString from 'query-string';
const baseURL='https://playerhostedapitest.herokuapp.com/api/';

// const baseURL='https://nhom3-tiki.herokuapp.com/api'
export const axiosClient = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
    paramsSerializer: (params) => queryString.stringify(params)
});

export const axiosClientWithPayment = axios.create({
    baseURL: 'https://mypayment-momo.herokuapp.com/api',
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
    paramsSerializer: (params) => queryString.stringify(params)
});

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
    
    changeTypeOrder: async (params, id) => {
        const res = await axiosClient.patch(`/myorders/${id}`,params)
        return res.data;
    },
    makePaymentMomo: async (params) => {
        const res = await axiosClientWithPayment.post('/create-payment',params)
        return res.data;
    },
    
}
export default apiCart;