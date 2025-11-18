import axiosClient from "./axiosClient";

const addressApi = {
    getAddress:()=>axiosClient.get('/address'),
    postAddress:(data)=>axiosClient.post('/address/add',{data}),
    deleteAddress:(addressId)=>axiosClient.delete(`/address/${addressId}`),
    patchAddress:(addressId)=>axiosClient.patch(`/address/setDefault/${addressId}`),
    putAddress:(address)=>axiosClient.put('/address/edit',{address})
}
export default addressApi;