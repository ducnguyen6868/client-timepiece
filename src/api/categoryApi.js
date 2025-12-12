import axiosClient from "./axiosClient";

const categoryApi = {
    getCategories: () => axiosClient.get('/category'),
    getCategory:(slug)=>axiosClient.get(`/category/${slug}`)
}

export default categoryApi;