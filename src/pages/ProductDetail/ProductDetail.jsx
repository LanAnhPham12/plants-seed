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
const randomScore = Math.floor(Math.random() * 3) + 3; // Random score between 3 and 5
const randomReviews = Math.floor(Math.random() * 30) + 1; // Random number of reviews between 1 and 30
function ProductDetail() {
    const [product, setProduct] = useState(null); // Sử dụng null thay vì []
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams();
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await productApi.getProductDetail(id);
                console.log('API Response:', response); // Log toàn bộ response
                setProduct(response.product); // Cập nhật state với dữ liệu sản phẩm từ API
            } catch (error) {
                console.error('Error fetching product:', error);
                // Xử lý lỗi hoặc logging tại đây
            }
        };

        fetchProduct(); // Gọi hàm fetchProduct khi id thay đổi
    }, [id]); // Thêm id vào dependency array để useEffect chạy lại khi id thay đổi

    if (!product) {
        return <div>Loading...</div>; // Render loading nếu product là null hoặc rỗng
    }

    const handleIncrement = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecrement = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };
    return (
        <div>
            <Header />
            <div className="container mt-5 pt-5">
              
                <div className="row mt-5 justify-content-center gap-4">
                    <div className="col-4">
                    <ProductSlider images={product.images} />
                    </div>
                    <div className="col-6">
                        <div className='f-s-36 f-f-Cardo-Semibold text-start'>
                            {product.name}
                        </div>
                        <div className={`d-flex gap-2 mt-2 justify-content-start align-items-center text-success f-f-Cardo-Semibold`}>
                        <RatingStars score={randomScore} />
                        {randomReviews} reviews
                        </div>
                        <div className='mt-2 text-success f-s-28 f-f-Cardo-Semibold'>
                        €{product.price}
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
                            <button className={`${styles.cartBtn} mt-3 d-flex gap-2 justify-content-center align-items-center`}>
                                
                            <FontAwesomeIcon className='text-white' icon={faCartShopping} />
                            <span>
                            Add to Cart
                            </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ProductDetail;
