import axios from "axios";
const baseURL = "https://tazhib.ir/wp-json";
let config = {
  method: "get",
  url: "https://tazhib.ir/wp-json",
};

class Products {
  constructor() {
    this.service = axios.create({});
  }
  read(endpoint, token) {
    return this.service.get(`${baseURL}${endpoint}`, {
      ...config, headers: {
        Authorization:
          `Bearer ${token}`,
      },
    });
  }
}

const product = new Products();
export default product;