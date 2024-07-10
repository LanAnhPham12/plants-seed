import styles from "./header.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import Cart from "../../pages/Cart/Cart";
import userApi from "../../api/userApi";
import path from "../../Constant/path";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Header() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate()
    useEffect(() => {
        const idUser = localStorage.getItem('userId');
        const fetchUser = async () => {
            try {
                const response = await userApi.getUserById(idUser);
                if (response) {
                    setUser(response);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error('Error fetching user:', error);
                setUser(null);
            }
        };

        fetchUser();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userId');
        setUser(null);
        navigate('/login');
    };

    return (
        <div>
            <div className='d-flex align-items-center justify-content-between px-3 fixed-top' style={{ backgroundColor: "#046a38", color: "#fff" }}>
                <div className="d-flex align-items-center">
                    <img src="https://dms.mydukaan.io/original/webp/media/32d1d4d6-aa87-4e7b-a8e2-f2b57a815e88.png" alt="" style={{ width: '70px' }} />
                    <span className="fw-bold fs-5 ">Seeds</span>
                </div>
                <div className={`${styles["All-Category"]}`}>
                    <ul className="d-flex m-0 gap-5 text-uppercase fs-6 fw-semibold" style={{ listStyle: 'none' }}>
                        <Link className="text-white" to={path.home} style={{textDecoration: 'none'}}>
                            <li className={`${styles["Men"]}`}>Trang chủ</li>
                        </Link>
                        <Link className="text-white" to={path.products} style={{textDecoration: 'none'}}>
                            <i className="far fa-clock"></i>
                            <li className={`${styles["Men"]}`}>Sản phầm</li>
                        </Link>
                        <Link className="text-white" style={{textDecoration: 'none'}}>
                            <li className={`${styles["Men"]}`}>Về chúng tôi</li>
                        </Link>
                        {/*<Link to={path.checkout} className="text-white" style={{textDecoration: 'none'}}>*/}
                        {/*    <li className={`${styles["Men"]}`}>Đặt hàng</li>*/}
                        {/*</Link>*/}
                        <Link to={path.instruction} className="text-white" style={{textDecoration: 'none'}}>
                            <li className={`${styles["Men"]}`}>hướng dẫn mua hàng</li>
                        </Link>
                        <Link to={path.historyProducts} className="text-white" style={{textDecoration: 'none'}}>
                            <li className={`${styles["Men"]}`}>Lịch sử</li>
                        </Link>
                    </ul>
                </div>
                <div className="d-flex gap-5 me-4">
                    <Link to={path.searchProducts} className={`${styles["search_glass"]} border-0 bg-transparent`} style={{textDecoration: 'none'}}>
                        <FontAwesomeIcon className="f-s-18" icon={faSearch} style={{ color: '#fff' }} />
                    </Link>
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
                    {user ? (
                        <button onClick={handleLogout} className={`border-0 text-white bg-transparent ${styles["fs-5"]}`}>
                            Đăng xuất
                        </button>
                    ) : (
                        <Link to={path.login} className={`text-white ${styles["fs-5"]}`} style={{ textDecoration: 'none' }}>
                            Đăng nhập
                        </Link>
                    )}
                </div>
            </div>
            <Cart />
        </div>
    );
}

export default Header;
