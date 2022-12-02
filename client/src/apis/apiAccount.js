import axios from 'axios';
import queryString from 'query-string';
const baseURL = 'https://playerhostedapitest.herokuapp.com/api/'
// const baseURL='https://nhom3-tiki.herokuapp.com/api'
export const axiosClient = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
    paramsSerializer: (params) => queryString.stringify(params)
});
const apiAccount = {

    checkWishItem: async (params) => {
        const res = await axiosClient.get(`/wishlist?userId=${params.userId}&productSlug=${params.productSlug}`)
        return res.data
    },

    getWishListByUser: async (userId,params) => {
        const res = await axiosClient.get(`/wishlist?userId=${userId}`,params)
        return res.data;
    },

    postWishItem: async (params) => {
        const res = await axiosClient.post('/wishlist', params)
        return res.data
    },

    deleteWishItem: async (params) => {
        const res = await axiosClient.delete(`/wishlist/${params}`)
        return res.data
    }


}
export default apiAccount;