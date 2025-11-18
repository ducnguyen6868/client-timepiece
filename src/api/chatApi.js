import axiosClient from "./axiosClient";

const chatApi = {
    getConversations:()=>axiosClient.get('/chat/conversation'),
    getMessages:(conversationId)=>axiosClient.get(`/chat/message/${conversationId}`),
    postMessage:(message)=>axiosClient.post('/chat/send',{message}),
    postConversation:(sender,receiver)=>axiosClient.post(`/chat/create`,{sender,receiver})
}

export default chatApi;