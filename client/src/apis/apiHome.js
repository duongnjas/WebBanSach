import { BASE_URL, handleResponse } from "./apiconfig";
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
}
export default apiHome;