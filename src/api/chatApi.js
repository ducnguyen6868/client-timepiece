import axiosClient from "./axiosClient";

const chatApi = {
    getConversations: () => axiosClient.get('/chat/conversation'),
    getMessages: (conversationId) => axiosClient.get(`/chat/message/${conversationId}`),
    postMessage: (message) => axiosClient.post('/chat/send', { message }),
    postConversation: (participants, lastMessage) => axiosClient.post(`/chat/create`, { participants, lastMessage })
}

export default chatApi;