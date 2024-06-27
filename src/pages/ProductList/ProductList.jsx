import Product from "./Product/Product";
import styles from './ProductList.module.css'
import dataProduct from "../../data/product.json"
function ProductList() {
    console.log(dataProduct)
    return ( 
        <div className="">
            <div className={`${styles.banner} position-relative d-flex justify-content-center align-items-center`}>
                <div className="position-absolute text-center col-6 text-white f-s-18">
                    <div className="f-s-60">
                    Exotic Fruit & Tree Seeds
                    </div> 
                    Adding something exotic to your garden will make it unique! It is unlikely that fruits or vegetables from your country will have the same visual impact as those from abroad. Nonetheless, the most unknown one will help you strike up a conversation with your visitors. Choose your favorite from the many you will find here in this Exotic Seeds Collection. Whether it is planting or harvesting you needn't worry about, we have got you covered.
                </div>
            </div>
            <div className="container mt-5 px-5">
                <div className="row row-cols-4 px-5 g-4 gy-5">
                    <Product/>
                    <Product/>
                    <Product/>
                    <Product/>
                    <Product/>
                </div>
            </div>
        </div>
     );
}

export default ProductList;