
//import { axiosClient, axiosInstance } from "./axiosClient";
import axios from 'axios';
import queryString from 'query-string';
import { BASE_URL, handleResponse } from "./apiconfig";
const baseURL = 'https://playerhostedapitest.herokuapp.com/api/'
export const axiosClient = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
    paramsSerializer: (params) => queryString.stringify(params)
});
var config = {
    method: 'get',
    url:  `${BASE_URL}/products`,
    headers: { }
  };

//   var requestOptions = {
//     method: 'GET',
//     redirect: 'follow'
//   };
  
//   fetch("http://localhost:5000/api/v1/products/slug/chu-thuat-hoi-chien-tap-6-p195801653", requestOptions)
//     .then(response => response.text())
//     .then(result => console.log(result))
//     .catch(error => console.log('error', error));

const apiProduct = {

    getProductsBySlug : async (slug) => {
        const response = await fetch(
            `${BASE_URL}/products/slug/${slug}`,
            {
                method: 'GET',
                redirect: 'follow',
            }
        );
        //console.log(response);
        return handleResponse(response);
    },
    getProductsBySearch : async (name) => {
        const response = await fetch(
            `${BASE_URL}/products/search/${name}`,
            {
                method: 'GET',
                redirect: 'follow',
            }
        );
        //console.log(response);
        return handleResponse(response);
    },

    getProductsById: async (id) => {
        const res = await axiosClient.get('/products', { params: { id } })
        return res.data;
    },
    getProducts: async () => {
        axios(config)
        .then(function (response) {
        //   console.log(JSON.stringify(response.data));
          return JSON.stringify(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    }, 
    getCategoryFilterById: async (params) => {
        const res = await axiosClient.get('/categories', { params })
        return res.data;
    },

 




}
export default apiProduct;