import RatingStars from "./RatingStar/RatingStar";
import styles from "../ProductList.module.css"
function Product() {
    // const {dataProduct} = props
    return ( 
        <div className={`${styles['card-product']}`}>
            <div className="card h-100 w-80">
            <img src= "https://www.gardenparadiseseeds.com/cdn/shop/files/Garden_Order_Online_Shop_Luo_Han_Guo_Monk_fruit_Seeds_Siraitiagrosvenorii_258x396.png?v=1691401674" className="card-img-top" alt="..." sizes="258px"/>
                <div className="card-body">
                    <div className="card-title text-truncate f-s-20">Monk fruit Seeds | Luo Han Guo - Siraitia grosvenorii</div>
                    <div className={`d-flex gap-2 justify-content-center align-items-center ${styles['text-green']}`}>
                    <RatingStars score={4.5} />
                    10 reviews
                    </div>
                    <div className="text-center text-green">€4,39</div>
                </div>
            </div>
        </div>
     )
}

export default Product;