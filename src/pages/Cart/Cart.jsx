import React, { useEffect, useState } from 'react';
import styles from './Cart.module.css';
import CartItem from './CartItem';
import userApi from '../../api/userApi';
import { useNavigate } from 'react-router-dom';
import path from '../../Constant/path';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const idUser = localStorage.getItem('userId');
        if (!idUser) {
            console.error('No user ID found in localStorage');
            return;
        }

        const fetchCartItems = async () => {
            try {
                const userData = await userApi.getUserById(idUser);
                setCartItems(userData.cart);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, []);

    useEffect(() => {
        const calculateTotal = () => {
            const totalPrice = cartItems.reduce((acc, item) => acc + item.total, 0);
            setTotal(totalPrice);
        };

        calculateTotal();
    }, [cartItems]);

    const handleUpdateCart = (updatedCartItems) => {
        setCartItems(updatedCartItems);
    };

    const handleCheckout = () => {
        // Redirect to Checkout and reload
        navigate(path.checkout, { replace: true });
        window.location.reload();
    };

    return (
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div className="offcanvas-header" style={{ border: '1px solid green' }}>
                <div className='text-success f-s-26 f-f-Cardo-Semibold' id="offcanvasRightLabel">Giỏ hàng ({cartItems.length})</div>
                <button type="button" className={`btn-close me-2 ${styles.btnClose}`} data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                {cartItems.length === 0 ? (
                    <p className='f-s-20'>Không có sản phẩm trong giỏ hàng</p>
                ) : (
                    <>
                        <ul className="list-group">
                            {cartItems.map((item, index) => (
                                <CartItem key={index} data={item} onUpdateCart={handleUpdateCart} />
                            ))}
                        </ul>
                        <div className='py-4 d-flex justify-content-between' style={{ borderBottom: '1px solid green' }}>
                            <div className='f-s-28 f-f-Cardo-Semibold text-success'>Tổng</div>
                            <div className='f-s-28 f-f-Cardo-Semibold text-success'>€{total.toFixed(2)}</div>
                        </div>
                        <div className='mt-3'>
                            <button className={`${styles.btnCheckOut} py-3 w-100 f-s-18 text-white`} onClick={handleCheckout}>Thanh toán</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart;
