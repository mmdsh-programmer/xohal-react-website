import axios from "axios";
const baseURL = "https://tazhib.ir/wp-json";
let config = {
    method: "get",
    url: "https://tazhib.ir/wp-json/wc/v3/products",
    headers: {
        Authorization:
            "Basic Y2tfM2ViOThkNWY1Yjk3ODQ4OWVhZTY5YzIzOWNjYWNiOGJmMjcxMzFiMjpjc19jMzBkNGE4NzM1MTE2MTYwODdjMTQ5NGMzMDQyZTU5MTc2M2YyYTg0",
    },
};

class Search {
    constructor() {
        this.service = axios.create({});
    }
    read(endpoint) {
        return this.service.get(`${baseURL}${endpoint}`, config);
    }
}

const searchresult = new Search();
export default searchresult;