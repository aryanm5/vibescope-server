import axiosPackage from 'axios';



const axios = axiosPackage.create({
    baseURL: `https://vibescope-server-87247abcc671.herokuapp.com/`,
    headers: {},
    validateStatus: () => true
});

const post = async (path, info) =>
    await axios.post(path, info)

export { post };