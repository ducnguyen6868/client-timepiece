import axiosClient from './axiosClient';

const promotionApi = {
    getPromotion:()=>axiosClient.get('/promotion'),
    searchPromotion:(code)=>axiosClient.get(`/promotion/search?code=${code}`),
}

export default promotionApi;