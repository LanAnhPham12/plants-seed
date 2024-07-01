import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import productApi from '../../api/productApi';
import ProductSlider from './ProductSlider';
import RatingStars from '../ProductList/Product/RatingStar/RatingStar';
import styles from './ProductSlider.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import userApi from '../../api/userApi';
import Swal from 'sweetalert2';
import path from '../../Constant/path';
import { useNavigate } from 'react-router-dom';


const randomScore = Math.floor(Math.random() * 3) + 3; // Random score between 3 and 5
const randomReviews = Math.floor(Math.random() * 30) + 1; // Random number of reviews between 1 and 30

function ProductDetail() {
    const [product, setProduct] = useState(null); // Sử dụng null thay vì []
    const [quantity, setQuantity] = useState(1);
    const [seeds, setSeeds] = useState(3); // Giá trị mặc định của hạt giống là 3
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await productApi.getProductDetail(id);
                setProduct(response.product); // Cập nhật state với dữ liệu sản phẩm từ API
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct(); // Gọi hàm fetchProduct khi id thay đổi
    }, [id]); // Thêm id vào dependency array để useEffect chạy lại khi id thay đổi

    useEffect(() => {
        const idUser = localStorage.getItem('userId');
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

    const handleAddToCart = async () => {
        if (!user) return;
    
        try {
            const item = { id: product.id, seeds, quantity, total: (product.price / 3) * seeds * quantity };
            const response = await userApi.addToCart(user.id, item);
            setUser(response);
            await Swal.fire({
                icon: 'success',
                text: 'Thêm vào giỏ hàng thành công',
                showConfirmButton: false, // Ẩn nút OK
                timer: 2000, // Tự động đóng sau 
                timerProgressBar: false, // Hiển thị thanh tiến trình đếm ngược
            })
            navigate(path.products)
            console.log("Cập nhật giỏ hàng thành công:", response);
        } catch (error) {
            console.error("Lỗi khi cập nhật giỏ hàng:", error);
        }
    };

    if (!product) {
        return <div>Loading...</div>; // Render loading nếu product là null hoặc rỗng
    }

    const handleIncrement = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecrement = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    const handleSeedsChange = (e) => {
        setSeeds(Number(e.target.value));
    };

    const totalPrice = (product.price / 3) * seeds * quantity;

    return (
        <div>
            <Header />
            <div className="container mt-5 pt-5">
                <div className="row justify-content-center gap-4">
                    <div className="col-4">
                        <ProductSlider images={product.images} />
                    </div>
                    <div className={`col-6 ${styles.scrolLableContent}`}>
                        <div className='f-s-36 f-f-Cardo-Semibold text-start'>
                            {product.name}
                        </div>
                        <div className={`d-flex gap-2 mt-2 justify-content-start align-items-center text-success f-f-Cardo-Semibold`}>
                            <RatingStars score={randomScore} />
                            {randomReviews} reviews
                        </div>
                        <div className='mt-2 text-success f-s-28 f-f-Cardo-Semibold'>
                            €{totalPrice.toFixed(2)}
                        </div>
                        <div className='text-success my-3 f-s-18 f-f-Cardo-Medium'>
                            Seeds
                        </div>
                        <div className={styles.seedsInput}>
                            <select 
                                className={`${styles.seedsInput} w-100`} 
                                value={seeds} 
                                onChange={handleSeedsChange}
                            >
                                <option value="3">3 Seeds</option>
                                <option value="30">30 Seeds</option>
                                <option value="100">100 Seeds</option>
                            </select>
                        </div>
                        <div className='text-success my-3 f-s-18 f-f-Cardo-Medium'>
                            Quantity
                        </div>
                        <div className={styles.quantityInput}>
                            <button className={styles.quantityBtn} onClick={handleDecrement}>-</button>
                            <input 
                                type="text" 
                                id="quantity" 
                                value={quantity} 
                                readOnly 
                                className={styles.quantityDisplay} 
                            />
                            <button className={styles.quantityBtn} onClick={handleIncrement}>+</button>
                        </div>
                        <div className='mt-2'>
                            <button 
                                className={`${styles.cartBtn} mt-3 d-flex gap-2 justify-content-center align-items-center`} 
                                onClick={handleAddToCart}
                            >
                                <FontAwesomeIcon className='text-white' icon={faCartShopping} />
                                <span>Add to Cart</span>
                            </button>
                        </div>
                        <div>
                            <div dangerouslySetInnerHTML={{ __html: product.description }} />
                            <h4 className='mt-3'>Shipping Information:</h4>
                            <div  style={{ border: '1px solid #ccc', padding: '10px' }}>
                                <h3 className='text-center'>Shipping Information</h3>
                                <p className='text-center'>
                                    <strong>European countries:</strong> 3-7 working days. <br />
                                    Shipping cost: 3.50 EUR.
                                </p>
                                <p className='text-center'>
                                    <strong>Rest of the world:</strong> 3 to 10 working days. <br />
                                    Shipping cost: 3.95 Euros.
                                </p>
                            </div>
                            <div className='text-center'>
                                <br />
                                <span>At </span>
                                <strong>Garden Paradise Seeds</strong>
                                <span>, our commitment is to deliver top-quality products accompanied by unparalleled customer service. We take pride in offering a superior experience to our valued customers throughout their entire journey with us. From the moment you purchase, until you decide to retire our product, we are here to support you every step of the way. Please don't hesitate to reach out if you have any inquiries or require assistance. We are always available and ready to provide the help you need. Your satisfaction is our priority.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ProductDetail;
