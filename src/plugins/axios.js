import axios from "axios";

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.interceptors.request.use((config) => {
    config.params = config.params || {};
    config.params["ajax"] = 1;
    return config;
});
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log(error);
        // whatever you want to do with the error
        throw error;
    }
);
export default axios;
