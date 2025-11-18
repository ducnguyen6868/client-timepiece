import axiosClient from "./axiosClient";

const categoryApi = {
    category: () => axiosClient.get("/category"),
    getCategories: () => axiosClient.get('/category')

}

export default categoryApi;