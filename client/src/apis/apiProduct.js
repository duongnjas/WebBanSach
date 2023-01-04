
import { BASE_URL, handleResponse } from "./apiconfig";

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
    findproductById : async (id) => {
        const response = await fetch(
            `${BASE_URL}/products/${id}`,
            {
                method: 'GET',
                redirect: 'follow',
            }
        );
        //console.log(response);
        return handleResponse(response);
    },
    insertProduct: async (params) => {
        const response = await fetch(
            `${BASE_URL}/products/`,
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

    updateProduct: async (params, id) => {
        const response = await fetch(
            `${BASE_URL}/products/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params)
            }
        );
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
    getAllProducts: async () => {
        const response = await fetch(
            `${BASE_URL}/products/`,
            {
                method: 'GET',
                redirect: 'follow',
            }
        );
        //console.log(handleResponse(response))
        return handleResponse(response);
    },
    removeProduct: async (id) => {
        const response = await fetch(
            `${BASE_URL}/products/${id}`,
            {
                method: 'DELETE',
                redirect: 'follow',
            }
        );
        //console.log(handleResponse(response))
        return handleResponse(response);
    },

}
export default apiProduct;