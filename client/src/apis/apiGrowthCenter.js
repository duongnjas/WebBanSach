
import { axiosClientWithToken } from "./axiosClient";

const apiGrowthCenter = {
    getGrowthCenter : async (params) => {
        const res = await axiosClientWithToken.get('/growthcenter')
        return res.data;
    },
}
export default apiGrowthCenter;