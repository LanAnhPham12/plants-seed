import Product from "../ProductList/Product/Product";
import styles from '../ProductList/ProductList.module.css'
import dataProduct from "../../data/product.json"
import { useState } from 'react';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
function HistoryProduct() {
    const [currentPage, setCurrentPage] = useState(1);

    // Tính toán các chỉ mục của các sản phẩm hiện tại
    const currentProducts = dataProduct.find((item) => item.page === currentPage).jsonObject.collection.productVariants;
    const [searchQuery, setSearchQuery] = useState('');
    const filteredProducts = currentProducts.filter((product) =>
        product.product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    // Tính tổng số trang
    const totalPages = Math.ceil(filteredProducts.length);

    // Hàm để hiển thị các nút phân trang
    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5; // Số lượng trang tối đa hiển thị

        let startPage = currentPage - Math.floor(maxVisiblePages / 2);
        if (startPage < 1) {
            startPage = 1;
        }

        let endPage = startPage + maxVisiblePages - 1;
        if (endPage > totalPages) {
            endPage = totalPages;
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`f-s-20 f-f-Cardo-Semibold btn  ${currentPage === i ? `${styles['bg-green']} text-white` : `${styles['bg-grey']}`} ${styles['text-green']} mx-1`}
                >
                    {i}
                </button>
            );
        }

        return pageNumbers;
    };
   
    return ( 
        <div>
            <Header/>
            <div className="container mb-5 pt-5">
                <div className="row justify-content-center mt-5">
                    <div className= {`col-auto f-s-36 f-f-Cardo-Semibold ${styles['text-green']}`}>
                        Sản phẩm đã xem
                    </div>
                </div>
                <div className="row justify-content-center my-4">
                    <div className="col-6">
                        <div className="input-group">
                        <input
                                type="text"
                                className={`form-control p-3 f-s-20 f-f-Cardo-Semibold ${styles['input-search']}`}
                                placeholder="Tìm kiếm theo tên hạt giống"
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

export default HistoryProduct;