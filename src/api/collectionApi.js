import axiosClient from './axiosClient';

const collectionApi = {
    getCollections :()=>axiosClient.get('/collection'),
    getCollection :(slug)=>axiosClient.get(`/collection/${slug}`)
}

export default collectionApi;