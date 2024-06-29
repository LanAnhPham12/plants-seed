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
        `${config.baseURL}/${URL_USERS}${userId}`
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
};

export default userApi;
