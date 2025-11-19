import axiosClient from './axiosClient';

const communityApi = {
    getCommunities : (page,limit)=>axiosClient.get(`/community?page=${page}&&limit=${limit}`),
}

export default communityApi;