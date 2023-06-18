import axiosPackage from 'axios';


const DEV = true;


const axios = axiosPackage.create({
    baseURL: `https://api.mittaldev.com/voluntime${DEV ? '-dev' : ''}/`,
    headers: {},
    validateStatus: () => true
});

const post = async (path, info) =>
    await axios.post(path, info)

export { post };