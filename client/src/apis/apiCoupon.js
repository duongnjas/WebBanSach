import axios from 'axios';
import queryString from 'query-string';
const baseURL='https://playerhostedapitest.herokuapp.com/api/'
// const baseURL='https://nhom3-tiki.herokuapp.com/api'
export const axiosClient = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
    paramsSerializer: (params) => queryString.stringify(params)
});


const apiCoupon = {
    getCoupons: async (params) => {
        const res = await axiosClient.get('/coupons', {params})
        return res.data;
    },

    postCoupon: async (params ) => {
        const res = await axiosClient.post('/coupons', params)
        return res.data;
    },

    deleteCouponById: async (params) => {
        const res = await axiosClient.delete(`/coupons/${params.id}`)
        return res.data;
    },

    updateCoupon: async (params,id) => {
        const res = await axiosClient.patch(`/coupons/${id}`,params)
        return res.data;
    },

    findCouponById: async (params) => {
        const res = await axiosClient.get(`/coupons`,{params})
        return res.data;
    },
     
}
export default apiCoupon;