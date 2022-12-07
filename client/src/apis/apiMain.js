import axios from 'axios';
import queryString from 'query-string';

import { axiosClient, axiosInstance } from "./axiosClient";

// create axiosProducts to test favorite product
const baseURL='https://playerhostedapitest.herokuapp.com/api/'
const baseURL2='http://localhost:5000/api/'
//const baseURL='https://nhom3-tiki.herokuapp.com/api'
export const axiosProducts = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
    paramsSerializer: (params) => queryString.stringify(params)
});
export const axiosProducts2 = axios.create({
    baseURL: baseURL2,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
    paramsSerializer: (params) => queryString.stringify(params)
});

const apiMain = {

    ///authentication
    getProducts: async (params) => {
        const res = await axiosProducts2.get('/products', {params})
        return res.data;
    },

    getNotification: async (params) => {
        const res = await axiosProducts.get('/notifications', {params})
        return res.data;
    },

    getOrders: async (params) => {
        const res = await axiosProducts.get('/myorder', {params})
        return res.data;
    },
    
    getMyFavorites: async (params) => {
        const myFavorite = await axiosProducts.get('', {params})
        return myFavorite.data;
    },


    getCoupons: async (params) => {
        const res = await axiosProducts.get('/coupons', {params})
        return res.data;
    },

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