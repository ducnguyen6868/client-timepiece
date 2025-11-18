import axiosClient from './axiosClient';

const reviewApi = {
    post: (formData) => axiosClient.post('/review', formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }),
    get:(code,page,limit)=>axiosClient.get(`review?code=${code}&&page=${page}&&limit=${limit}`),
}

export default reviewApi;