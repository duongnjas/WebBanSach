
import { axiosClient, axiosClientWithToken } from "./axiosClient";

const apiAddress = {

    getUserAddress: async (params) => {
        const res = await axiosClientWithToken.get('/address')
        return res.data;
    },
    deleteAddressById: async (params) => {
        const res = await axiosClientWithToken.delete(`/address/${params.id}`)
        return res.data;
    },
    saveAddress: async (params) => {
        const res = await axiosClientWithToken.put('/address', params)
        return res.data;
    },

    updateUserAddressById: async (params, id) => {
        const res = await axiosClientWithToken.post(`/address/${id}`, params)
        return res.data;
    },
    getAddressById: async (params) => {
        const res = await axiosClientWithToken.get('/address', { params })
        return res.data;
    },
    getCommuneInDistrictById: async (params) => {
        const res = await axiosClient.get(`address/commune/${params.id}`)
        return res.data;
    },
    getDistrictInProvinceById: async (params)=>{
        const res= await axiosClient.get(`address/district/${params.id}`)
        return res.data;
    },
    getAllProvince : async (params)=>{
        const res = await axiosClient.get('address/province')
        return res.data;
    },

}
export default apiAddress;