import { BASE_URL, handleResponse } from "./apiconfig";
const apiMain = {
    getProducts : async () => {
        const response = await fetch(
            `${BASE_URL}/products`,
            {
                method: 'GET',
            }
        );
        return handleResponse(response);
    },
}
    
export default apiMain;