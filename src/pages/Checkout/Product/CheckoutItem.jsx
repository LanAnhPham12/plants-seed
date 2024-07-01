import { useEffect, useState } from 'react';
import productApi from '../../../api/productApi';

function CheckoutItem({data}) {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productData = await productApi.getProductById(data.id);
                setProduct(productData);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [data.id]);

    if (!product) {
        return <div>Loading...</div>;
    }
    console.log(data);
    console.log(product);
    return ( 
        <div className="row my-3 mx-auto justify-content-center align-items-start text-success">
            <div className="d-flex align-items-center col-2 py-3" style={{backgroundColor:'#fff', borderRadius: '4px', border: '1px solid #ccc'}} >
                <img className='w-100' src={product.image.src} alt="" />
            </div>
            <span style={{backgroundColor: '#7f7f7f', height: '18px', width: '18px', borderRadius: '100%', display: 'flex', justifyContent: 'center', alignItems:'center', marginLeft: '-7px', color:'#fff', fontSize: '12px', marginTop: '-8px'}}>{data.quantity}</span>
            <div className=" col-6">
                <div className='f-s-16 f-f-Cardo-Semibold text-wrapper'>{product.product.title}</div>
                <div className='f-s-14 f-f-Cardo-Medium mt-2'>{data.seeds} Seeds</div>
            </div>
            <div className="f-s-20 f-f-Cardo-Bold text-success col-3 my-auto">€ {(data.total).toFixed(2)}</div>
        </div>
    );
}

export default CheckoutItem;