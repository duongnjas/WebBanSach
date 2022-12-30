import axios from 'axios';
import queryString from 'query-string';
import { BASE_URL, handleResponse } from "./apiconfig";

import { axiosClient, axiosInstance } from "./axiosClient";
const apiMain = {
    getProducts : async () => {
        const response = await fetch(
            `${BASE_URL}/products`,
            {
                method: 'GET',
            }
        );
        return handleResponse(response);
    },

    ///authentication
    // getProducts: async (params) => {
    //     const res = await axiosProducts2.get('/products', {params})
    //     return res.data;
    //},

    // getNotification: async (params) => {
    //     const res = await axiosProducts.get('/notifications', {params})
    //     return res.data;
    // },

    // getOrders: async (params) => {
    //     const res = await axiosProducts.get('/myorder', {params})
    //     return res.data;
    // },
    
    // getMyFavorites: async (params) => {
    //     const myFavorite = await axiosProducts.get('', {params})
    //     return myFavorite.data;
    // },


    // getCoupons: async (params) => {
    //     const res = await axiosProducts.get('/coupons', {params})
    //     return res.data;
    // },

    verifyToken: async (user, dispatch, stateSuccess) => {
        const url = `/auth/verifytoken`
        let axi = axiosInstance(user, dispatch, stateSuccess)
        return (await axi.get(url, { headers: { Authorization: `Bearer ${user.accessToken}` } })).data;
    },
    
    postLogin: async (params) => {
        const myLogin = await axiosClient.post('/auth/login', params)
        return myLogin.data;
    },
    
    search: async (params) => {
        const mySearch = await axiosClient.post('', params)
        return mySearch.data;
    },

    getOptions: async (params) =>{
        const myOptions = await axiosClient.get('', params)
        return myOptions.data;
    }
}
    
export default apiMain;