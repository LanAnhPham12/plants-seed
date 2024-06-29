import React, { useEffect } from 'react';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import productApi from '../../api/productApi';
function HistoryProduct() {
    // const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                console.log('Fetching products from API...');
                const response = await productApi.getProductById("6184820506799");
                console.log('Items from API:', response);
                // if (Array.isArray(response) && response.length > 0) {
                //     setProducts(response);
                //     console.log('Products set successfully:', response);
                // } else {
                //     console.log('API response is not valid or empty:', response);
                //     setProducts([]);
                // }
            } catch (error) {
                console.error('Error fetching products:', error);
                // Handle error state or logging as needed
            }
        };

        fetchProducts();
    }, []);


    return ( 
        <div>
            <Header />


            <Footer/>
        </div>
     );
}

export default HistoryProduct;