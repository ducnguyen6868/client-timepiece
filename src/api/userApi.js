import axiosClient from './axiosClient';

const userApi = {
    changePassword: (passwords) => axiosClient.post('/profile/change-password', passwords),
    getWishlist: () => axiosClient.get('/wishlist'),
    checkWishlist :(slug)=>axiosClient.get(`/check-wishlist/${slug}`),
    patchWishlist: (action, slug) => axiosClient.patch(`/user/${action}/${slug}`),
    patchCart: (sku) => axiosClient.patch(`/add-to-cart/${sku}`),
    deleteCart: (sku) => axiosClient.delete(`/delete/${sku}`),
    getCart: () => axiosClient.get('/view-cart'),
    changeQuantity: (sku, quantity) => axiosClient.patch('/cart/change-quantity', { sku, quantity }),
    getList: (role, page, limit) => axiosClient.get(`/user?role=${role}&&page=${page}&&limit=${limit}`),
    patchStatusUser: (userId, status) => axiosClient.patch(`/change-status?status=${status}`, { userId }),

}
export default userApi;