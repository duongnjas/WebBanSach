// import {  axiosClientWithToken} from "./axiosClient";
import { BASE_URL, handleResponse } from "./apiconfig";

const apiProfile = {

    putChangePassword: async (params, id) => {
        const response = await fetch(
            `${BASE_URL}/users/${id}`,
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
    putChangeInfo: async (params, id) => {
        const response = await fetch(
            `${BASE_URL}/users/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            }
        );
        return handleResponse(response);
    },
    getUserProfile: async (id) => {
        const response = await fetch(
            `${BASE_URL}/users/${id}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return handleResponse(response);
    },
    putChangePassword: async (param, id) => {
        const response = await fetch(
            `${BASE_URL}/users/${id}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(param),
            }
        );
        return handleResponse(response);
    },
    ///authentication
    // putChangePassword: async (params) => {
    //     const res = await axiosClientWithToken.put('/user/profile/changePassword', params)
    //     return res.data;
    // },
    // putUploadAvatar: async (params) => {
    //     const res = await axiosClientWithToken.post('/user/profile/uploadAvatar', params,{headers: {
    //         'Content-Type': 'multipart/form-data'
    //       }})
    //     return res.data;
    // },
    // putChangeInfo: async (params) => {
    //     const res = await axiosClientWithToken.put('/user/profile/changeInfo', params)
    //     return res.data;
    // },
    // getUserbyID: async (params) => {
    //     const res = await axiosClientWithToken.get(`/user/${params}`)
    //     return res.data;
    // },
    // getUserProfile: async () => {
    //     const res = await axiosClientWithToken.get(`/user/profile`)
    //     return res.data;
    // },
    // putChangePhone: async (params) => {
    //     const res = await axiosClientWithToken.put('/user/profile/changePhone', params)
    //     return res.data;
    // },

    // getAllUser: async (params) => {
    //     const res = await axiosClientWithToken.get('admin/user/all', params)
    //     return res.data;
    // },

    

}
    
export default apiProfile;