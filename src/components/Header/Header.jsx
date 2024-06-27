import React, { useState } from 'react';
import styles from "./header.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
function Header() {
    const [isSearchVisible, setSearchVisible] = useState(false);

    function toggleSearch() {
      setSearchVisible(!isSearchVisible);
    }
    return ( 
        <div>
            <div>
            <div className='d-flex align-items-center justify-content-between px-3' style={{ backgroundColor: "#046a38", color: "#fff" }}>
                <div className="d-flex align-items-center">
                <img src="https://dms.mydukaan.io/original/webp/media/32d1d4d6-aa87-4e7b-a8e2-f2b57a815e88.png" alt="" style={{ width: '70px' }} />
                <span className="fw-bold fs-5 ">Seeds</span>
            </div>
            <div className={`${styles["All-Category"]}`}>
                <ul className="d-flex m-0 gap-5 text-uppercase fs-6 fw-semibold" style={{ listStyle: 'none' }}>
                    <li className={`${styles["Men"]}`}>Trang chủ
                    </li>
                    <li className={`${styles["Men"]}`}>Hạt giống
                    </li>
                    <li className={`${styles["Men"]}`}>Về chúng tôi
                    </li>
                    <li className={`${styles["Men"]}`}>Đặt hàng
                    </li>
                    <li className={`${styles["Men"]}`}>Liên hệ
                    </li>

                </ul>
            </div>
            <div className="d-flex gap-4" >
                <button className={`${styles["search_glass"]} border-0  bg-transparent ${styles['fs-5']}`}
                 onClick={toggleSearch}><FontAwesomeIcon icon={faSearch} style={{ color: '#fff' }} />
                </button>
                <button className={`border-0 bg-transparent ${styles["fs-5"]}`}><FontAwesomeIcon className='text-white' icon={faCartShopping} /></button>
                <button className={`border-0 bg-transparent ${styles["fs-5"]}`}><FontAwesomeIcon icon={faUser} className='text-white' /></button>
            </div>
            </div>
            </div>


            <div id={`${styles["myDIV"]}`} style={{ display: isSearchVisible ? 'block' : 'none' }}>
                <div className={`${styles["Input-Search"]}`}>
                <input type="text" name="" id="" placeholder="Search entire store here..."/>
                <button className={`${styles["search-btn"]}`}>Search</button>
                </div>
                <div className="trending-search">
                    <h5 className="text-uppercase"><span className="mx-2" style= {{ marginRight: ' 5px' }}><i
                                className="fa-solid fa-arrow-trend-up"></i></span>TRENDING
                        SEARCHES</h5>

                    <div className={`${styles["procduct-type"]}`}>
                        <button className={`${styles["btn-product"]}`}>Men Shirts</button>
                        <button className={`${styles["btn-product"]}`}>Cargo Joggers</button>
                        <button className={`${styles["btn-product"]}`}>Oversized T-shirts</button>
                        <button className={`${styles["btn-product"]}`}>T-shirts</button>
                        <button className={`${styles["btn-product"]}`}>Combos</button>
                        <button className={`${styles["btn-product"]}`}>Pyjamas</button>
                        <button className={`${styles["btn-product"]}`}>Boxers</button>
                        <button className={`${styles["btn-product"]}`}>Chino Pants</button>
                    </div>
                </div>
            </div>

        </div>
     );
}

export default Header;