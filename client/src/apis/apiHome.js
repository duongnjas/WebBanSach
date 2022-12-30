import axios from 'axios';
import queryString from 'query-string';
//const baseURL='https://playerhostedapitest.herokuapp.com/api/'
// const baseURL='https://nhom3-tiki.herokuapp.com/api'
import { BASE_URL, handleResponse } from "./apiconfig";

var config = {
    method: 'get',
    url:  `${BASE_URL}/products`,
    headers: { }
  };
const apiHome = {
  getProducts : async () => {
    const response = await fetch(
        `${BASE_URL}/products`,
        {
            method: 'GET',
        }
    );
    console.log(response);
    return handleResponse(response);
},

    // getProducts: async () => {
    //     axios(config)
    //     .then(function (response) {
    //       console.log(JSON.stringify(response.data));
    //       return JSON.stringify(response.data)
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // }, 
}
export default apiHome;