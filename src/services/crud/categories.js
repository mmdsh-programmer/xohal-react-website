import axios from "axios";
const baseURL = "https://tazhib.ir/wp-json";
let config = {
  method: "get",
  url: "https://tazhib.ir/wp-json/wc/v3/products/categories",
};

class Categories {
  constructor() {
    this.service = axios.create({});
  }
  create() {

  }

  read(endpoint, token) {
    return this.service.get(`${baseURL}${endpoint}`, {
      ...config, headers: {
        Authorization:
          `Bearer ${token}`,
      },
    });
  }

  update() {

  }

  delete() {

  }

}

const category = new Categories();
export default category;