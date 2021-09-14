import axios from "axios";
const baseURL = "https://xohal.com/wp-json";
let config = {
  method: "get",
  url: "https://xohal.com/wp-json",
  headers: {
    Authorization:
      "Basic Y2tfNTFmZGQwY2Q4YzY2ZDc3NmYzMTg1Y2Y4MDExMDQ1MDZhM2UzOTFiYTpjc180MWJlMWRmNmNhY2Q5NTViMDg3ZTAwZTgwMjRlZjZlZjRjYWRkNTRk",
  },
};

class Products {
  constructor() {
    this.service = axios.create({});
  }
  read(endpoint) {
    return this.service.get(`${baseURL}${endpoint}`, config);
  }
}

const product = new Products();
export default product;