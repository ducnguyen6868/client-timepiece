import axiosClient  from './axiosClient';

const userApi= {
    changePassword:(passwords)=>axiosClient.post('/profile/change-password',passwords),
    wishlist:()=>axiosClient.get('/wishlist'),
    addWishlist:(code,index)=>axiosClient.post('/wishlist/add',{code,index}),
    removeWishlist:(code)=>axiosClient.post('/wishlist/delete',{code}),
    viewCart:()=>axiosClient.get('/view-cart'),
    addCart:(cart)=>axiosClient.patch('/add-to-cart',{cart}),
    deleteCart:(cartId)=>axiosClient.delete(`/cart/${cartId}`),
    changeQuantity:(cartId,quantity) =>axiosClient.patch('/cart/change-quantity',{cartId,quantity}),
    getList:(role, page,limit)=>axiosClient.get(`/user?role=${role}&&page=${page}&&limit=${limit}`),
    patchStatusUser:(userId,status)=>axiosClient.patch(`/user/change?status=${status}`,{userId}),
   
}
export default userApi;