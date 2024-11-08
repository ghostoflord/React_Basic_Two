import axios from './axios.customize';
const registerUserAPI = (fullName, email, password, phone) => {
    const URL_BACKEND = "/api/v1/user/register";
    const data = {
        fullName: fullName,
        email: email,
        password: password,
        phone: phone
    }
    return axios.post(URL_BACKEND, data);
}
const loginAPI = (username, password) => {
    const URL_BACKEND = "/api/v1/auth/login";
    const data = {
        username: username,
        password: password
    }
    return axios.post(URL_BACKEND, data);
}
export {
    registerUserAPI, loginAPI
}   