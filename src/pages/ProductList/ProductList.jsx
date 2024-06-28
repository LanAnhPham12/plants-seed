import Product from "./Product/Product";
import styles from './ProductList.module.css'
import dataProduct from "../../data/product.json"
import { useState } from 'react';
import Header from "../../components/Header/Header";
function ProductList() {
    
    const [currentPage, setCurrentPage] = useState(1);

    // Tính toán các chỉ mục của các sản phẩm hiện tại
    const currentProducts = dataProduct.find((item) => item.page === currentPage).jsonObject.collection.productVariants;
    // Tính tổng số trang
    const totalPages = Math.ceil(dataProduct.length);

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
    const [sortByName, setSortByName] = useState(false);
    const [sortByPrice, setSortByPrice] = useState(false);
    const sortByNameAsc = (a, b) => a.product.title.localeCompare(b.product.title);
    const sortByNameDesc = (a, b) => b.product.title.localeCompare(a.product.title);
    const sortByPriceAsc = (a, b) => a.price.amount - b.price.amount;
    const sortByPriceDesc = (a, b) => b.price.amount - a.price.amount;
    let sortedProducts = [...currentProducts];

    if (sortByName) {
    sortedProducts.sort(sortByName === 'asc' ? sortByNameAsc : sortByNameDesc);
    }

    if (sortByPrice) {
    sortedProducts.sort(sortByPrice === 'asc' ? sortByPriceAsc : sortByPriceDesc);
    }
    console.log(sortedProducts);
    return (
        <div className="">
            <Header/>
            <div className={`${styles.banner} position-relative d-flex justify-content-center align-items-center`}>
                <div className="position-absolute text-center col-6 text-white f-s-18">
                    <div className="f-s-60">
                        Exotic Fruit & Tree Seeds
                    </div>
                    Adding something exotic to your garden will make it unique! It is unlikely that fruits or vegetables from your country will have the same visual impact as those from abroad. Nonetheless, the most unknown one will help you strike up a conversation with your visitors. Choose your favorite from the many you will find here in this Exotic Seeds Collection. Whether it is planting or harvesting you needn't worry about, we have got you covered.
                </div>
            </div>
            <div className="container my-5 px-5">
                <div className="row px-5">
                    <div className="col-12 mb-4">
                    <div className="d-flex justify-content-between mb-3">
                            <div className="d-flex align-items-center f-s-18">
                                <span className="f-s-18 f-f-Cardo-Semibold">Sắp xếp theo tên:</span>
                                <select
                                className={`btn ${styles['bg-grey']} ${styles['text-green']} mx-1`}
                                value={sortByName}
                                onChange={(e) => setSortByName(e.target.value)}
                                >
                                <option className="f-s-18 f-f-Cardo-Semibold" value="">Không sắp xếp</option>
                                <option className="f-s-18 f-f-Cardo-Semibold" value="asc">Tăng dần</option>
                                <option className="f-s-18 f-f-Cardo-Semibold" value="desc">Giảm dần</option>
                                </select>
                            </div>
                            <div className="d-flex align-items-center f-s-18">
                                <span className="f-s-18 f-f-Cardo-Semibold">Sắp xếp theo giá:</span>
                                <select
                                className={`btn ${styles['bg-grey']} ${styles['text-green']} mx-1`}
                                value={sortByPrice}
                                onChange={(e) => setSortByPrice(e.target.value)}
                                >
                                <option className="f-s-18 f-f-Cardo-Semibold" value="">Không sắp xếp</option>
                                <option className="f-s-18 f-f-Cardo-Semibold" value="asc">Tăng dần</option>
                                <option className="f-s-18 f-f-Cardo-Semibold" value="desc">Giảm dần</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row row-cols-4 px-5 g-4 gy-5">
                    {sortedProducts.map((product, index) => (
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
        </div>
    );
}

export default ProductList;