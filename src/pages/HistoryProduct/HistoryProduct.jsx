import React, { useEffect, useState } from 'react';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import productApi from '../../api/productApi';
import userApi from '../../api/userApi';
import Product from '../ProductList/Product/Product';
import { Link } from 'react-router-dom';
import path from '../../Constant/path';

function HistoryProduct() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchHistoryProducts = async () => {
            const userId = localStorage.getItem('userId');
            try {
                const userData = await userApi.getUserById(userId);
                const productPromises = userData.historyProduct.map(productId => 
                    productApi.getProductById(productId)
                );
                const productsData = await Promise.all(productPromises);
                setProducts(productsData.reverse());
                console.log(productsData)
            } catch (error) {
                console.error('Error fetching history products:', error);
            }
        };

        fetchHistoryProducts();
    }, []);

    return ( 
        <div style={{maxHeight: '100vh'}}>
            <Header />
            <div className="container mt-5 pt-3">
                {products.length > 0 ? (
                    <>
                        <div className="text-center mb-4 f-s-32 f-f-Cardo-Semibold text-success mt-5">Lịch sử đã xem</div>
                        <div className="row row-cols-4 px-5 g-4 gy-5 text-center">
                            {products.map((product, index) => (
                                <Product key={index} dataProduct={product} />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="text-center f-s-24 text-success my-5 py-4">
                        Bạn chưa xem sản phẩm nào.<br />
                        Vui lòng tham khảo <Link to={path.products} className='text-success f-s-24'>Tại đây</Link>
                    </div>
                )}
            </div>
            <Footer />
        </div>
     );
}

export default HistoryProduct;
