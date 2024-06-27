import RatingStars from "./RatingStar/RatingStar";
import styles from "../ProductList.module.css"
function Product(props) {
    const {dataProduct} = props
    return ( 
        <div className={`${styles['card-product']}`}>
            <div className="card h-100 w-80">
            <img src= {dataProduct.image.src} className="card-img-top h-100" alt="..." sizes="258px"/>
                <div className="card-body">
                    <div className="card-title text-truncate f-s-20 f-f-Cardo-Semibold">{dataProduct.product.title}</div>
                    <div className={`d-flex gap-2 justify-content-center align-items-center ${styles['text-green']}`}>
                    <RatingStars score={4.5} />
                    10 reviews
                    </div>
                    <div className={`text-center f-f-Cardo-Semibold ${styles['text-green']}`}>€4,39</div>
                </div>
            </div>
        </div>
     )
}

export default Product;