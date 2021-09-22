import axios from "axios";
const baseURL = "https://admin.xohal.com/wp-json";
let config = {
    method: "post",
    url: "https://admin.xohal.com/wp-json/wc/v3/orders",
    headers: {
        Authorization:
            "Basic Y2tfNTFmZGQwY2Q4YzY2ZDc3NmYzMTg1Y2Y4MDExMDQ1MDZhM2UzOTFiYTpjc180MWJlMWRmNmNhY2Q5NTViMDg3ZTAwZTgwMjRlZjZlZjRjYWRkNTRk",
    },
};

class Orders {
    constructor() {
        this.service = axios.create({});
    }
    create(data, endpoint) {
        return this.service.post(`${baseURL}${endpoint}`, data, config);
    }
}

const order = new Orders();
export default order;