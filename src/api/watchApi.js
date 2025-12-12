import axiosClient from './axiosClient';

const watchApi = {
    getWatch: (slug) => axiosClient.get(`/watch/${slug}`),
    patchViewCount:(slug)=>axiosClient.patch(`/watch/${slug}/increase-view`),
    getWatches: (page,limit) => axiosClient.get(`/watch?page=${page}&&limit=${limit}`),
    search: (keyword) => axiosClient.get(`/watch/search?keyword=${keyword}`),
    postWatches:(formData)=>axiosClient.post('/watch/add',formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    }),
    postImgToSearch:(formData)=>axiosClient.post('/watch/search-by-image?limit=12&threshold=0.3',formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    }),
    deleteWatch:(watchId)=>axiosClient.delete(`/watch/delete/${watchId}`),
    wishlist: (wishlist) => axiosClient.post('watch/wishlist', wishlist),
    getTrending: (page, limit) => axiosClient.get(`/watch/trending?page=${page}&&limit=${limit}`),
    getVibeFinder: (cateId) => axiosClient.get(`/watch/category/${cateId}`),
    getFlashSale: (page, limit) => axiosClient.get(`/watch/flash-sale?page=${page}&&limit=${limit}`),
    patchStock:(sku,stock)=>axiosClient.patch(`/watch/stock/update?sku=${sku}&&stock=${stock}`),
    
}
export default watchApi;