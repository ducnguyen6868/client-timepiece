import axiosClient from "./axiosClient";
const profileApi = {
    profile: () => axiosClient.get('/profile'),
    patchAvatar: (formData) => axiosClient.patch('/profile/avatar/change', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }),
    patchPersonal:(fullName,phone)=>axiosClient.patch('/profile/personal/change',{fullName,phone})
}
export default profileApi;