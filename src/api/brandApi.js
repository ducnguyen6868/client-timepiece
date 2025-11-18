import axiosClient from "./axiosClient";

const brandApi = {
    getBrands:()=>axiosClient.get("/brand"),
    getBrand:(slug)=>axiosClient.get(`/brand/${slug}`),
}

export default brandApi;