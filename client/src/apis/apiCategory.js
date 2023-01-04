import { BASE_URL, handleResponse } from "./apiconfig";

const apiCategory = {
    showAllCategory: async (param) => {
        const response = await fetch(
            `${BASE_URL}/categories/`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                redirect: 'follow',
            }
        );
        //console.log(handleResponse(response))
        return handleResponse(response);
    },
    findCategoryById: async (param) => {
        const response = await fetch(
            `${BASE_URL}/categories/${param}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                redirect: 'follow',
            }
        );
        //console.log(handleResponse(response))
        return handleResponse(response);
    },
    updateCategory: async (param,id) => {
        const response = await fetch(
            `${BASE_URL}/categories/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(param),
                redirect: 'follow'
            }
        );
        //console.log(handleResponse(response))
        return handleResponse(response);
    },
    insertCategory: async (params) => {
        const response = await fetch(
            `${BASE_URL}/categories/`,
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
    deleteCategory: async (param) => {
        const response = await fetch(
            `${BASE_URL}/categories/${param}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                redirect: 'follow',
            }
        );
        //console.log(handleResponse(response))
        return handleResponse(response);
    },
}
export default apiCategory;