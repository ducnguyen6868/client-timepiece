import axiosClient from './axiosClient';

const productApi = {
    getProduct: (slug) => axiosClient.get(`/product/${slug}`),
    getProducts: (page,limit) => axiosClient.get(`/product?page=${page}&&limit=${limit}`),
    search: (keyword) => axiosClient.get(`/product/search?keyword=${keyword}`),
    postProduct:(formData)=>axiosClient.post('/product/add',formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    }),
    postImgToSearch:(formData)=>axiosClient.post('/product/search-by-image?limit=12&threshold=0.3',formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    }),
    deleteProduct:(productId)=>axiosClient.delete(`/product/delete/${productId}`),
    wishlist: (wishlist) => axiosClient.post('product/wishlist', wishlist),
    getTrending: (page, limit) => axiosClient.get(`/product/trending?page=${page}&&limit=${limit}`),
    getVibeFinder: (cateId) => axiosClient.get(`/product/category/${cateId}`),
    getFlashSale: (page, limit) => axiosClient.get(`/product/flash-sale?page=${page}&&limit=${limit}`),
    patchStock:(productId,index,stock)=>axiosClient.patch(`/product/stock/update?productId=${productId}&&index=${index}&&stock=${stock}`),

}
export default productApi;