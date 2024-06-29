import RatingStars from "./RatingStar/RatingStar";
import styles from "../ProductList.module.css"
import { Link } from "react-router-dom";
function Product(props) {
    const {dataProduct} = props
    const randomScore = Math.floor(Math.random() * 3) + 3; // Random score between 3 and 5
    const randomReviews = Math.floor(Math.random() * 30) + 1; // Random number of reviews between 1 and 30
    return ( 
        <Link className="text-decoration-none" to={`${dataProduct.product.id}`}>
            <div className={`${styles['card-product']}`}>
                <div className={`${styles['card-shadow']} card h-100 w-80`}>
                <img src= {dataProduct.image.src} className="card-img-top h-100" alt="..." sizes="258px"/>
                    <div className="card-body">
                        <div className="card-title text-truncate f-s-20 f-f-Cardo-Semibold mb-1">{dataProduct.product.title}</div>
                        <div className={`text-center f-s-20 f-f-Cardo-Semibold ${styles['text-green']}`}>€{dataProduct.price.amount}</div>
                        <div className={`d-flex gap-2 justify-content-center align-items-center ${styles['text-green']}`}>
                        <RatingStars score={randomScore} />
                        {randomReviews} reviews
                        </div>
                    </div>
                </div>
            </div>
        </Link>
     )
}

export default Product;