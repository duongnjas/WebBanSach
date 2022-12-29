export const BASE_URL = "http://localhost:5000/api/v1";

export const handleResponse = async (response) => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}