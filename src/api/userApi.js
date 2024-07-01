import axios from "axios";
import config from "../Constant/config"; // Đường dẫn tới file config của bạn

export const URL_USERS = "users"; // Đường dẫn API cho users

const userApi = {
  getAllUsers: async () => {
    try {
      const response = await axios.get(`${config.baseURL}/${URL_USERS}`); // Lấy dữ liệu từ API
      return response.data; // Trả về dữ liệu từ phản hồi của API
    } catch (error) {
      console.error("Error fetching all users:", error);
      throw error;
    }
  },

  getUserById: async (userId) => {
    try {
      const response = await axios.get(
        `${config.baseURL}${URL_USERS}/${userId}`
      ); // Lấy dữ liệu người dùng theo ID từ API
      return response.data; // Trả về dữ liệu từ phản hồi của API
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw error;
    }
  },

  createUser: async (userData) => {
    try {
      const response = await axios.get(`${config.baseURL}${URL_USERS}`); // Gửi yêu cầu POST để tạo người dùng mới
      console.log("userData: ", userData);
      const user = response.data.find((u) => u.username === userData.username);
      console.log("user", user);
      if (!user) {
        await axios.post(`${config.baseURL}${URL_USERS}`, userData);
        return { success: true, message: "Đăng ký thành công" }; // Trả về dữ liệu từ phản hồi của API sau khi tạo người dùng
      }
      return { success: false, message: "Tên đăng nhập đã tồn tại" }; // Trả về dữ liệu từ phản hồi của API sau khi tạo người dùng
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  loginUser: async (userCredentials) => {
    try {
      const response = await axios.get(`${config.baseURL}${URL_USERS}`); // Lấy danh sách tất cả người dùng từ API
      const user = response.data.find(
        (u) =>
          u.username === userCredentials.username &&
          u.password === userCredentials.password
      );

      if (!user) {
        throw new Error("Sai tên đăng nhập hoặc mật khẩu");
      }

      return {
        success: true,
        message: "Đăng nhập thành công",
        user: user,
      }; // Trả về thông báo thành công khi đăng nhập
    } catch (error) {
      console.error("Error logging in:", error.message);
      return { success: false, message: error.message }; // Trả về thông báo lỗi khi có lỗi xảy ra hoặc không tìm thấy người dùng
    }
  },

  editUser: async (userId, updatedData) => {
    try {
      const response = await axios.put(
        `${config.baseURL}${URL_USERS}/${userId}`,
        updatedData
      );
      return response.data; // Trả về dữ liệu từ phản hồi của API sau khi chỉnh sửa người dùng
    } catch (error) {
      console.error("Error editing user:", error);
      throw error;
    }
  },

  addToCart: async (userId, item) => {
    try {
      const user = await userApi.getUserById(userId);
      const existingItemIndex = user.cart.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      let updatedCart;
      if (existingItemIndex !== -1) {
        updatedCart = user.cart.map((cartItem, index) =>
          index === existingItemIndex
            ? {
                ...cartItem,
                seeds: cartItem.seeds + item.seeds,
                quantity: cartItem.quantity + item.quantity,
                total: parseFloat(
                  (parseFloat(cartItem.total) + parseFloat(item.total)).toFixed(
                    2
                  )
                ),
              }
            : cartItem
        );
      } else {
        updatedCart = [...user.cart, item];
      }

      const updatedUser = { ...user, cart: updatedCart };
      const response = await userApi.editUser(userId, updatedUser);
      return response;
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  },

  editCart: async (userId, itemId, quantity, total) => {
    try {
      const user = await userApi.getUserById(userId);
      const updatedCart = user.cart.map((item) =>
        item.id === itemId
          ? { ...item, quantity: quantity, total: total }
          : item
      );
      const updatedUser = { ...user, cart: updatedCart };
      const response = await userApi.editUser(userId, updatedUser);
      return response;
    } catch (error) {
      console.error("Error editing cart:", error);
      throw error;
    }
  },

  deleteFromCart: async (userId, itemId) => {
    try {
      const user = await userApi.getUserById(userId);
      const updatedCart = user.cart.filter((item) => item.id !== itemId);
      const updatedUser = { ...user, cart: updatedCart };
      const response = await userApi.editUser(userId, updatedUser);
      return response;
    } catch (error) {
      console.error("Error deleting from cart:", error);
      throw error;
    }
  },
  deleteAllCartItem: async (userId) => {
    try {
      const user = await userApi.getUserById(userId);
      const updatedUser = { ...user, cart: [] };
      const response = await userApi.editUser(userId, updatedUser);
      return response;
    } catch (error) {
      console.error("Error deleting all cart items:", error);
      throw error;
    }
  },
};

export default userApi;
