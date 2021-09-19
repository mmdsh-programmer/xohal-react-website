import axios from "axios";
const baseURL = "https://tazhib.ir/wp-json";
let config = {
    method: "get",
    url: "https://tazhib.ir/wp-json/wc/v3/coupons",
    headers: {
        Authorization:
            "Basic Y2tfM2ViOThkNWY1Yjk3ODQ4OWVhZTY5YzIzOWNjYWNiOGJmMjcxMzFiMjpjc19jMzBkNGE4NzM1MTE2MTYwODdjMTQ5NGMzMDQyZTU5MTc2M2YyYTg0",
    },
};

class Coupons {
    constructor() {
        this.service = axios.create({});
    }
    create() {

    }

    read(endpoint) {
        return this.service.get(`${baseURL}${endpoint}`, config);
    }

    update() {

    }

    delete() {

    }

}

const coupon = new Coupons();
export default coupon;