import axios from 'axios';

const BASE_URL = 'http://reunitepetswebapi-dev.us-east-1.elasticbeanstalk.com/api/';
// const BASE_URL = 'http://localhost:44365/api/';
// const BASE_URL = 'https://jsonplaceholder.typicode.com/';

export const BaseApiInstance = () => {

    axios.interceptors.request.use((request) => {
            console.log("Axios Request : ", request);
        },
        function (error) {
            return Promise.reject(error);
        }
    );

    return axios.create({
        baseURL: BASE_URL,
        headers: {
            accept: 'application/json',
            // accept: 'application/json-patch+json',
        },
    });
};

export default BaseApiInstance;
