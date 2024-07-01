import { useEffect, useState } from 'react';
import productApi from '../../api/productApi';
import styles from './Cart.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import userApi from '../../api/userApi';

const idUser = localStorage.getItem('userId');

function CartItem({ data, onUpdateCart }) {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(data.quantity);
  const [total, setTotal] = useState(data.total);

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

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      const newTotal = product.price.amount * data.seeds * newQuantity;
      setTotal(newTotal);
      updateCart(newQuantity, newTotal);
    }
  };

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    const newTotal = product.price.amount * data.seeds * newQuantity;
    setTotal(newTotal);
    updateCart(newQuantity, newTotal);
  };

  const handleDeleteFromCart = async () => {
    try {
      const userId = idUser;
      const itemId = data.id;
      const response = await userApi.deleteFromCart(userId, itemId);
      console.log('Item deleted from cart:', response);

      // Call parent component to update cart items
      const updatedCartItems = await userApi.getUserById(userId); // Assuming this fetches updated cart items
      onUpdateCart(updatedCartItems.cart);
    } catch (error) {
      console.error('Error deleting item from cart:', error);
    }
  };

  const updateCart = async (newQuantity, newTotal) => {
    try {
      const userId = idUser;
      const itemId = data.id;
      const response = await userApi.editCart(userId, itemId, newQuantity, newTotal);
      const updatedCartItems = await userApi.getUserById(userId); // Assuming this fetches updated cart items
      onUpdateCart(updatedCartItems.cart);
      console.log('Cart item updated successfully:', response);
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="row justify-content-evenly align-items-center py-3" style={{ color: '#068647', borderBottom: '1px solid green' }}>
        <div className="col-3">
          <img className="w-100" src={product.image.src} alt='' />
        </div>
        <div className="col-9 d-flex align-items-center gap-3">
          <div className=' align-items-center' style={{ color: '#068647' }}>
            <div className="f-f-Cardo-Semibold f-s-18" style={{ color: '#068647' }}>
              {product.product.title}
            </div>
            <div className='f-f-Cardo-Medium'>{data.seeds} Seeds</div>
            <div className='mt-2 d-flex justify-content-between align-items-center'>
              <div className='d-flex justify-content-start gap-3 align-items-center'>
                <button className={styles.quantityBtn} onClick={handleDecrease}>-</button>
                <div>{quantity}</div>
                <button className={styles.quantityBtn} onClick={handleIncrease}>+</button>
              </div>
              <div className='f-s-24 f-f-Cardo-Bold'>€{total.toFixed(2)}</div>
            </div>
          </div>
          <FontAwesomeIcon icon={faTrash} className='text-green f-s-18 cursor-pointer' style={{ cursor: 'pointer' }} onClick={handleDeleteFromCart} />
        </div>
      </div>
    </div>
  );
}

export default CartItem;
