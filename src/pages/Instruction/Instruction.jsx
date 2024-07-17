import React from 'react';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from "../Instruction/Instruction.module.css";


function Instruction() {


    return(
        <div className="">
            <Header></Header>

            <div className={` ${styles.bodycontainer} `}>

                <div>
                    <h1>
                        [Thành viên mới] Hướng Dẫn Mua Hàng Trên Trang Web

                    </h1>
                    <h3> Bước 1: Tìm Kiếm Sản Phẩm</h3>

                    <h5>Trên Trang Chủ:</h5>
                    <p>Sử dụng thanh tìm kiếm ở phía trên cùng của trang để nhập tên hoặc loại hạt giống bạn muốn mua.
                        Bạn cũng có thể duyệt qua các danh mục sản phẩm ở thanh menu hoặc các bộ sưu tập nổi bật trên
                        trang
                        chủ.</p>
                    <div className={`${styles.img}`}>
                        <img style={{height: '100vh'}}
                             src={require('./Imgs/search.gif')}
                             alt=""/>
                    </div>

                    <h5>Trang Danh Mục Sản Phẩm:</h5>

                    <p> Chọn danh mục sản phẩm bạn quan tâm, chẳng hạn như "Hạt Giống Rau", "Hạt Giống Hoa", hoặc "Hạt
                        Giống
                        Trái Cây".
                        Sử dụng bộ lọc để thu hẹp kết quả theo loại cây, giá, đánh giá, hoặc độ phổ biến.</p>
                    <h3> Bước 2: Xem Chi Tiết Sản Phẩm</h3>


                    <h5>Chi Tiết Sản Phẩm:</h5>
                    <p> Nhấp vào hình ảnh hoặc tên sản phẩm để xem chi tiết sản phẩm.
                        Tại đây, bạn sẽ tìm thấy thông tin chi tiết về sản phẩm, bao gồm mô tả, giá, hướng dẫn gieo
                        trồng,
                        và đánh giá của khách hàng.</p>
                    <div className={`${styles.img}`}>
                        <img style={{height: '100vh'}}
                             src={require('./Imgs/productdetail.gif')}
                             alt=""/>
                    </div>
                    <h5> Lựa Chọn Số Lượng:</h5>

                    <p>Chọn số lượng hạt giống bạn muốn mua bằng cách sử dụng nút tăng giảm số lượng.</p>
                    <div className={`${styles.img}`}>
                        <img style={{height: '100vh'}}
                             src={require('./Imgs/choose.gif')}
                             alt=""/>
                    </div>
                    <h3> Bước 3: Thêm Sản Phẩm Vào Giỏ Hàng</h3>

                    <h5>Thêm Vào Giỏ Hàng:</h5>
                    <p> Nhấp vào nút "Thêm vào giỏ hàng" để thêm sản phẩm vào giỏ hàng của bạn.
                        Bạn sẽ thấy một thông báo xác nhận rằng sản phẩm đã được thêm vào giỏ hàng.</p>
                    <div className={`${styles.img}`}>
                        <img style={{height: '100vh'}}
                             src={require('./Imgs/addpd.gif')}
                             alt=""/>
                    </div>
                    <h5>Kiểm Tra Giỏ Hàng:</h5>

                    <p> Nhấp vào biểu tượng giỏ hàng ở góc trên bên phải của trang để xem các sản phẩm bạn đã thêm vào
                        giỏ hàng.
                        Kiểm tra lại số lượng và thông tin sản phẩm. Bạn có thể cập nhật số lượng hoặc xóa sản phẩm nếu
                        cần.</p>
                    <div className={`${styles.img}`}>
                        <img style={{height: '100vh'}}
                             src={require('./Imgs/cart.gif')}
                             alt=""/>
                    </div>
                    <h3>Bước 4: Tiến Hành Thanh Toán</h3>
                    <h5>Thanh Toán:</h5>

                    <p>Khi bạn đã sẵn sàng thanh toán, nhấp vào nút "Thanh toán" trong giỏ hàng.
                        Bạn sẽ được chuyển đến trang thanh toán.</p>
                    <div className={`${styles.img}`}>
                        <img style={{height: '100vh'}}
                             src={require('./Imgs/order.gif')}
                             alt=""/>
                    </div>
                    <h5> Điền Thông Tin:</h5>

                    <p>Nhập thông tin cá nhân, bao gồm tên, địa chỉ giao hàng, và số điện thoại.
                        Chọn phương thức thanh toán: thanh toán bằng thẻ tín dụng, thẻ ghi nợ, ví điện tử, hoặc thanh
                        toán
                        khi nhận hàng (COD).</p>
                    <h5> Xác Nhận Đơn Hàng:</h5>

                    <p>Kiểm tra lại tất cả các thông tin đơn hàng của bạn.
                        Nhấp vào nút "Xác nhận đơn hàng" để hoàn tất quá trình thanh toán. </p>

                    <h3> Hỗ Trợ Khách Hàng</h3>
                    <p>Nếu bạn có bất kỳ câu hỏi hoặc cần hỗ trợ, vui lòng liên hệ với đội ngũ chăm sóc khách hàng của
                        chúng
                        tôi qua:</p>

                    <p>Điện thoại: [Số điện thoại hỗ trợ]
                        Email: [Địa chỉ email hỗ trợ]
                        Chat trực tuyến: Sử dụng chức năng chat trực tuyến trên trang web của chúng tôi.
                        Cảm ơn bạn đã chọn mua sắm tại trang web bán hạt giống của chúng tôi. Chúc bạn có những trải
                        nghiệm
                        mua sắm tuyệt vời và thành công với những cây trồng từ hạt giống của chúng tôi!</p>
                </div>
            </div>
            <Footer></Footer>
        </div>

    )


}

export default Instruction;