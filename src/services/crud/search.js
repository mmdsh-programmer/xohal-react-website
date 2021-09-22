import axios from "axios";
const baseURL = "https://admin.xohal.com/wp-json";
let config = {
    method: "get",
    url: "https://admin.xohal.com/wp-json/wc/v3/products",
    headers: {
        Authorization:
            "Basic Y2tfNTFmZGQwY2Q4YzY2ZDc3NmYzMTg1Y2Y4MDExMDQ1MDZhM2UzOTFiYTpjc180MWJlMWRmNmNhY2Q5NTViMDg3ZTAwZTgwMjRlZjZlZjRjYWRkNTRk",
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