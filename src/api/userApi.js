import axiosClient  from './axiosClient';

const userApi= {
    changePassword:(passwords)=>axiosClient.post('/profile/change-password',passwords),
    getWishlist:()=>axiosClient.get('/wishlist'),
    postWishlist:(code,index)=>axiosClient.post('/wishlist/add',{code,index}),
    removeWishlist:(code)=>axiosClient.post('/wishlist/delete',{code}),
    getCart:()=>axiosClient.get('/view-cart'),
    postCart:(cart)=>axiosClient.patch('/add-to-cart',{cart}),
    deleteCart:(cartId)=>axiosClient.delete(`/cart/${cartId}`),
    changeQuantity:(cartId,quantity) =>axiosClient.patch('/cart/change-quantity',{cartId,quantity}),
    getList:(role, page,limit)=>axiosClient.get(`/user?role=${role}&&page=${page}&&limit=${limit}`),
    patchStatusUser:(userId,status)=>axiosClient.patch(`/user/change?status=${status}`,{userId}),
   
}
export default userApi;