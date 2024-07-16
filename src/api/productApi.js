import axios from "axios";
import config from "../Constant/config"; // Đường dẫn tới file config của bạn

export const URL_GET_ALL = "products";
export const URL_GET_PRODUCT_DETAIL = "productDetails";

const productApi = {
  getAllProducts: async () => {
    try {
      const response = await axios.get(config.baseURL + URL_GET_ALL); // Lấy dữ liệu từ API
      return response.data; // Trả về dữ liệu từ phản hồi của API
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getProductById: async (productId) => {
    try {
      const response = await axios.get(config.baseURL + URL_GET_ALL); // Lấy sản phẩm theo ID
      //   return response.data; // Trả về dữ liệu sản phẩm từ phản hồi của API
      for (let i = 0; i < response.data.length; i++) {
        const product = response.data[i];
        const productVariants =
          product?.jsonObject?.collection?.productVariants || [];

        // Duyệt qua từng sản phẩm trong productVariants để tìm sản phẩm có id phù hợp
        for (let j = 0; j < productVariants.length; j++) {
          if (productVariants[j].product.id === productId) {
            return productVariants[j]; // Trả về sản phẩm nếu tìm thấy id
          }
        }
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getAllProductTypes: async () => {
    try {
      const response = await axios.get(config.baseURL + URL_GET_ALL);
      const productTypes = new Set();

      response.data.forEach((product) => {
        const productVariants = product?.jsonObject?.collection?.productVariants || [];
        productVariants.forEach((variant) => {
          productTypes.add(variant.product.type);
        });
      });

      return Array.from(productTypes);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getProductByType: async (type) => {
    try {
      const response = await axios.get(config.baseURL + URL_GET_ALL);
      const productsByType = [];

      response.data.forEach((product) => {
        const productVariants = product?.jsonObject?.collection?.productVariants || [];
        productVariants.forEach((variant) => {
          if (variant.product.type === type) {
            productsByType.push(variant.product);
          }
        });
      });

      return productsByType;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getProductDetail: async (productId) => {
    const Visited_Items ="Visited_Items";
    //tạo key
    try {
      const response = await axios.get(
        `${config.baseURL}${URL_GET_PRODUCT_DETAIL}`
      );
      const product = response.data.find((p) => p.id === productId);


      if (product) {

        //local storage part
        localStorage.setItem(Visited_Items, JSON.stringify(product.id));
        let data=JSON.parse(localStorage.getItem(Visited_Items))
        console.log("You have visited product: ", product.id);

        return {
          success: true,
          message: "Lấy chi tiết sản phẩm thành công",
          product: product,

        };


      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

export default productApi;
