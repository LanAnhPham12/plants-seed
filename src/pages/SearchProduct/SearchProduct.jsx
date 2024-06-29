import React, { useEffect, useState } from 'react';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Product from "../ProductList/Product/Product";
import productApi from "../../api/productApi";
import styles from "../ProductList/ProductList.module.css";

function SearchProduct() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                console.log('Fetching products from API...');
                const response = await productApi.getAllProducts();
                console.log('Items from API:', response);
                if (Array.isArray(response) && response.length > 0) {
                    setProducts(response);
                    console.log('Products set successfully:', response);
                } else {
                    console.log('API response is not valid or empty:', response);
                    setProducts([]);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                // Handle error state or logging as needed
            }
        };

        fetchProducts();
    }, []);

    // Filter products based on search query
    const currentProducts = products.find((item) => item.page === currentPage)?.jsonObject.collection.productVariants || [];
    const filteredProducts = currentProducts.filter((product) =>
        product.product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Tính tổng số trang
    const totalPages = Math.ceil(filteredProducts.length);

    // Render số trang
    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxPageButtons = 5; // Giới hạn số lượng button chuyển trang
        const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
        const endPage = Math.min(startPage + maxPageButtons - 1, totalPages);

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`btn mx-1 ${currentPage === i ? styles['bg-green'] : styles['bg-grey']}`}
                >
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };

    return (
        <div>
            <Header />
            <div className="container my-5 pt-4">
                <div className="row justify-content-center mt-5">
                    <div className={`col-auto f-s-36 f-f-Cardo-Semibold ${styles['text-green']}`}>
                        Tìm kiếm sản phẩm
                    </div>
                </div>
                <div className="row justify-content-center my-4">
                    <div className="col-6">
                        <div className="input-group">
                            <input
                                type="text"
                                className={`form-control p-3 f-s-20 f-f-Cardo-Semibold ${styles['input-search']}`}
                                placeholder="Tìm kiếm theo tên hạt giống"
                                autoFocus
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="row row-cols-4 px-5 g-4 my-5">
                    {filteredProducts.map((product, index) => (
                        <Product key={index} dataProduct={product} />
                    ))}
                </div>
                <div className="d-flex justify-content-center mt-4">
                    <button
                        className={`btn ${styles['bg-grey']} ${styles['text-green']} mx-1`}
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        Trước
                    </button>
                    {renderPageNumbers()}
                    <button
                        className={`btn ${styles['bg-grey']} ${styles['text-green']} mx-1`}
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Sau
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default SearchProduct;
