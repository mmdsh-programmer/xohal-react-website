import axios from "axios";
const baseURL = "https://tazhib.ir/wp-json/jwt-auth/v1/token";
let config = {
    method: 'post',
    url: 'https://tazhib.ir/wp-json/jwt-auth/v1/token',
    headers: {}
};

class Signin {
    constructor() {
        this.service = axios.create({});
    }
    getToken(data, endpoint) {
        return this.service.post(`${baseURL}${endpoint}`, data, config);
    }
}

const login = new Signin();
export default login;