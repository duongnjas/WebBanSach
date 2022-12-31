
import { axiosClient, axiosClientWithToken } from "./axiosClient";
import { BASE_URL, handleResponse } from "./apiconfig";

const apiAddress = {
    getUserAddress: async (param) => {
        const response = await fetch(
            `${BASE_URL}/users/address/${param}`,
            {
                method: 'GET',
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