import axiosClient from "./axiosClient";
const orderApi={
    getRevenueData:(range)=>axiosClient.get(`/order/revenue?range=${range}`),
    getTopSelling:(time)=>axiosClient.get(`/order/top-selling?time=${time}`),
    getOrders:()=>axiosClient.get(`/order`),
    getOrder:(orderId) =>axiosClient.get(`/order/view?orderId=${orderId}`),
    viewList:(order)=>axiosClient.post('/order/list-order',{order}),
    postOrder:(orderData,orderId ,fromCart) =>axiosClient.post('/order/create',{orderData,orderId ,fromCart}),
    payment:(final_amount) =>axiosClient.post('/order/payment',{final_amount}),
    transitionStatus:(orderId) =>axiosClient.post('/order/transition-status',{orderId}),
    getOrdersManage:(page, limit)=>axiosClient.get(`/order/management?page=${page}&&limit=${limit}`),
    patchStatus:(orderId ,status)=>axiosClient.patch('/order/status',{orderId ,status}),
}
export default orderApi;