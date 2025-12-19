import axiosClient from './axiosClient';

const communityApi = {
    getCommunities : ()=>axiosClient.get(`/community`),
}

export default communityApi;