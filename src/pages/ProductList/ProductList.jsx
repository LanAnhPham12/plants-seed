import React, { useEffect, useState, useMemo } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Product from './Product/Product';
import productApi from '../../api/productApi';
import styles from '../ProductList/ProductList.module.css';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortByName, setSortByName] = useState(null);
    const [sortByPrice, setSortByPrice] = useState(null);
    const [typeList, setTypeList] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await productApi.getAllProducts();
                if (Array.isArray(response) && response.length > 0) {
                    setProducts(response);
                } else {
                    setProducts([]);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                // Handle error state or logging as needed
            }
        };

        fetchProducts();
    }, []);
    
    const currentProducts = useMemo(() => {
        const currentPageData = products.find((item) => item.page === currentPage);
        return currentPageData ? currentPageData.jsonObject.collection.productVariants : [];
    }, [products, currentPage]);

    // Calculate total pages
    const totalPages = useMemo(() => Math.ceil(products.length), [products]);

    // Render page numbers
    const renderPageNumbers = useMemo(() => {
        const pageNumbers = [];
        const maxPageButtons = 5; // Limit the number of page buttons
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
    }, [currentPage, totalPages]);

    // Handle sort by name
    const sortByNameHandler = (e) => {
        setSortByName(e.target.value);
        setSortByPrice(null);
    };

    // Handle sort by price
    const sortByPriceHandler = (e) => {
        setSortByPrice(e.target.value);
        setSortByName(null);
    };

    // Sort current products by name or price
    const sortedProducts = useMemo(() => {
        const sorted = [...currentProducts];
        if (sortByName) {
            sorted.sort(sortByName === 'asc' ? (a, b) => a.product.title.localeCompare(b.product.title) : (a, b) => b.product.title.localeCompare(a.product.title));
        } else if (sortByPrice) {
            sorted.sort(sortByPrice === 'asc' ? (a, b) => a.price.amount - b.price.amount : (a, b) => b.price.amount - a.price.amount);
        }
        return sorted;
    }, [currentProducts, sortByName, sortByPrice]);

    return (
        <div>
            <Header />
            <div className={` ${styles.banner} position-relative d-flex justify-content-center align-items-center mt-5 pt-4`}>
                <div className="position-absolute text-center col-6 text-white f-s-18">
                    <div className="f-s-55">
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
                                    value={sortByName || ''}
                                    onChange={sortByNameHandler}
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
                                    value={sortByPrice || ''}
                                    onChange={sortByPriceHandler}
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
                    {sortedProducts.length > 0 ? (
                        sortedProducts.map((product, index) => (
                            <Product key={index} dataProduct={product} />
                        ))
                    ) : (
                        <div>No products found</div>
                    )}
                </div>
                <div className="d-flex justify-content-center mt-4">
                    <button
                        className={`btn ${styles['bg-grey']} ${styles['text-green']} mx-1`}
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        Trước
                    </button>
                    {renderPageNumbers}
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

export default ProductList;
