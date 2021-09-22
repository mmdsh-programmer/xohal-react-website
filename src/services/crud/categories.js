import axios from "axios";
const baseURL = "https://admin.xohal.com/wp-json";
let config = {
  method: "get",
  url: "https://admin.xohal.com/wp-json/wc/v3/products/categories",
  headers: {
    Authorization:
      "Basic Y2tfNTFmZGQwY2Q4YzY2ZDc3NmYzMTg1Y2Y4MDExMDQ1MDZhM2UzOTFiYTpjc180MWJlMWRmNmNhY2Q5NTViMDg3ZTAwZTgwMjRlZjZlZjRjYWRkNTRk",
  },
};

class Categories {
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

const category = new Categories();
export default category;