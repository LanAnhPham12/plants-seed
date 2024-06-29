import axios from "axios";
import config from "../Constant/config"; // Đường dẫn tới file config của bạn

export const URL_GET_ALL = "products";

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
};

export default productApi;
