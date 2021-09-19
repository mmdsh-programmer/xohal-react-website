import axios from "axios";
const baseURL = "https://tazhib.ir/wp-json";
let config = {
    method: "post",
    url: "https://tazhib.ir/wp-json/wc/v3/orders",
};

class Orders {
    constructor() {
        this.service = axios.create({});
    }
    create(data, endpoint, token) {
        return this.service.post(`${baseURL}${endpoint}`, data, {
            ...config, headers: {
                Authorization:
                    `Bearer ${token}`,
            },
        });
    }
}

const order = new Orders();
export default order;