import CheckoutItem from './Product/CheckoutItem';
import userApi from '../../api/userApi';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import styles from './checkout.module.css'
import { useNavigate } from 'react-router-dom';
import path from '../../Constant/path';

function Checkout() {
    const [checkoutItems, setCheckoutItems] = useState([]);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [ward, setWard] = useState('');
    const [address, setAddress] = useState('');
    const [notes, setNotes] = useState('');

    useEffect(() => {
        const fetchCheckoutItems = async () => {
            const idUser = localStorage.getItem('userId');
            try {
                const userData = await userApi.getUserById(idUser);
                setCheckoutItems(userData.cart);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCheckoutItems();
    }, []);

    useEffect(() => {
        const calculateTotal = () => {
            const totalAmount = checkoutItems.reduce((acc, item) => acc + item.total, 0);
            setTotal(totalAmount);
        };

        calculateTotal();
    }, [checkoutItems]);

    const handleOrder = async () => {
        if (!email || !phone || !lastName || !firstName || !province || !district || !ward || !address) {
            Swal.fire({
                icon: 'error',
                title: 'Thiếu thông tin',
                text: 'Vui lòng điền đầy đủ thông tin trước khi đặt hàng.',
            });
            return;
        }

        const userId = localStorage.getItem('userId');
        try {
            // Hiển thị thông báo thành công
            await Swal.fire({
                icon: 'success',
                title: 'Đặt hàng thành công',
                showConfirmButton: false,
                timer: 2000
            });

            // Gọi API để xóa tất cả các mục trong giỏ hàng
            await userApi.deleteAllCartItem(userId);

            // Xóa các mục trong giỏ hàng tại giao diện
            setCheckoutItems([]);
            setTotal(0);
            navigate(path.home);
        } catch (error) {
            console.error("Error processing order:", error);
        }
    };

    return (
        <div>
            <div className='container'>
                <div className='row text-success justify-content-center'>
                    <div className='col-6 pt-5'>
                        <div className='w-75 m-auto'>
                            <label className='mb-3 f-f-Cardo-Bold' htmlFor="">Email liên hệ</label>
                            <input
                                required
                                className='w-100'
                                type="email"
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label className='mb-3 f-f-Cardo-Bold mt-3' htmlFor="">Thông tin nhận hàng</label>
                            <input
                                required
                                className='w-100'
                                type="text"
                                placeholder='Số điện thoại'
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <div className='row mt-3 d-flex justify-content-around'>
                                <input
                                    required
                                    placeholder='Họ'
                                    className='col-5 me-3'
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                <input
                                    required
                                    placeholder='Tên'
                                    className='col-5 ms-3'
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <input
                                required
                                className='w-100 mt-3'
                                type="text"
                                placeholder='Tỉnh'
                                value={province}
                                onChange={(e) => setProvince(e.target.value)}
                            />
                            <input
                                required
                                className='w-100 mt-3'
                                type="text"
                                placeholder='Huyện'
                                value={district}
                                onChange={(e) => setDistrict(e.target.value)}
                            />
                            <input
                                required
                                className='w-100 mt-3'
                                type="text"
                                placeholder='Xã'
                                value={ward}
                                onChange={(e) => setWard(e.target.value)}
                            />
                            <input
                                required
                                className='w-100 mt-3'
                                type="text"
                                placeholder='Địa chỉ cụ thể'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            <label className='mb-3 f-f-Cardo-Bold mt-5' htmlFor="">Ghi chú</label>
                            <textarea
                                className='w-100 mb-5'
                                rows={4}
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                    <div className="col-4 border-left border-start pt-3" style={{ backgroundColor: '#f5f5f5' }}>
                        <div className='w-100 m-auto'>
                            {checkoutItems.map((item, index) => (
                                <CheckoutItem key={index} data={item} />
                            ))}
                            <div className='mt-4' style={{ borderBottom: '1px solid green' }}></div>
                            <div className="container">
                                <div className='row justify-content-around mt-3'>
                                    <h5 className='f-f-Cardo-Bold col-8'>Tổng</h5>
                                    <h4 className='f-f-Cardo-Bold col-4 text-center'>€ {total.toFixed(2)}</h4>
                                </div>
                                <div className="row mt-2">
                                    <div className="col">
                                        <button
                                            className={`${styles.btnOrder} py-3 w-100 f-s-18 text-white`}
                                            onClick={handleOrder}
                                        >
                                            Đặt hàng
                                        </button>
                                    </div>
                                </div>
                                <button className="btn f-f-Cardo-Bold me-4 mt-4" style={{ float:'right' ,backgroundColor: '#068647', borderColor: '#068647', color: '#fff', padding: '8px 15px'}}>Xác nhận đặt hàng</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
