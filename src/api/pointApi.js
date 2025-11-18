import axiosClient from "./axiosClient";

const pointApi = {
    patch:(userId)=>axiosClient.patch('/point',{userId}),
    put:(userId , orderId , discountPoint)=>axiosClient.put('/point/shoping',{userId,orderId,discountPoint})
}

export default pointApi;