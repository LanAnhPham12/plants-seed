import styles from "./header.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import Cart from "../../pages/Cart/Cart";
import userApi from "../../api/userApi";

const idUser = localStorage.getItem('userId');

function Header() {
    const [user, setUser] = useState(null); // Thay đổi initial state thành null
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await userApi.getUserById(idUser);
                if (response) {
                    setUser(response); // Đảm bảo truy cập đúng thuộc tính của response
                } else {
                    setUser(null); // Đặt lại thành null nếu không tìm thấy người dùng
                }
            } catch (error) {
                console.error('Error fetching user:', error);
                setUser(null); // Đặt lại thành null nếu có lỗi xảy ra
            }
        };

        fetchUser();
    }, []);

    return (
        <div>
            <div className='d-flex align-items-center justify-content-between px-3 fixed-top' style={{ backgroundColor: "#046a38", color: "#fff" }}>
                <div className="d-flex align-items-center">
                    <img src="https://dms.mydukaan.io/original/webp/media/32d1d4d6-aa87-4e7b-a8e2-f2b57a815e88.png" alt="" style={{ width: '70px' }} />
                    <span className="fw-bold fs-5 ">Seeds</span>
                </div>
                <div className={`${styles["All-Category"]}`}>
                    <ul className="d-flex m-0 gap-5 text-uppercase fs-6 fw-semibold" style={{ listStyle: 'none' }}>
                        <li className={`${styles["Men"]}`}>Trang chủ</li>
                        <li className={`${styles["Men"]}`}>Hạt giống</li>
                        <li className={`${styles["Men"]}`}>Về chúng tôi</li>
                        <li className={`${styles["Men"]}`}>Đặt hàng</li>
                        <li className={`${styles["Men"]}`}>Liên hệ</li>
                    </ul>
                </div>
                <div className="d-flex gap-5 me-4">
                    <button className={`${styles["search_glass"]} border-0 bg-transparent`}>
                        <FontAwesomeIcon icon={faSearch} style={{ color: '#fff' }} />
                    </button>
                    <button
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasRight"
                        aria-controls="offcanvasRight"
                        className={`border-0 bg-transparent ${styles["fs-5"]} position-relative`}>
                        <FontAwesomeIcon className='text-white f-s-18' icon={faCartShopping} />
                        {user && user.cart && (
                            <div className="position-absolute text-white f-f-Cardo-Bold" style={{ top: '-50%', right: '-50%' }}>
                                {user.cart.length}
                            </div>
                        )}
                    </button>
                    <button className={`border-0 bg-transparent ${styles["fs-5"]}`}>
                        <FontAwesomeIcon icon={faUser} className='text-white' />
                    </button>
                </div>
            </div>
            <Cart />
        </div>
    );
}

export default Header;
