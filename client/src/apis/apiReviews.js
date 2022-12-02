
import axios from 'axios';
import queryString from 'query-string';

const baseURL='https://playerhostedapitest.herokuapp.com/api/'
export const axiosProducts = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
    paramsSerializer: (params) => queryString.stringify(params)
});

const apiReviews = {
    getMyReviews: async (params) => {
        const myReview = await axiosProducts.get('/myreviews', {params})
        return myReview.data;
    },
    postMyReviews: async (params) =>{
        const res = await axiosProducts.post('/myreviews', params)
        return res.data;
    },
    updateMyReviews: async (params,id) =>{
        const res = await axiosProducts.patch('/myreviews/'+id, params)
        return res.data;
    },
    getMyRevPurchaseds: async (params) =>{
        const myRevPurchaseds = await axiosProducts.get('', {params})
        return myRevPurchaseds.data;
    },

    getRevProduct: async (params) => {
        const revProduct = await axiosProducts.get('', {params})
        return revProduct.data;
    },    
}
export default apiReviews; 