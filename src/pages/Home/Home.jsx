import Cart from "../Cart/Cart";
import { useState } from "react";
function Home() {
    const [cart, setCart] = useState([
        { id: 1, name: 'Product 1' },
        { id: 2, name: 'Product 2' },
        { id: 3, name: 'Product 3' },
      ]);
    
      const addToCart = (item) => {
        setCart([...cart, item]);
      };
    //   const [newProduct, setNewProduct] = useState({ id: 4, name: 'Product 4' });
      const removeFromCart = (index) => {
        const updatedCart = [...cart];
        updatedCart.splice(index, 1);
        setCart(updatedCart);
      };
    //   const handleAddToCart = () => {
    //     addToCart(newProduct);
    //     setNewProduct({ id: newProduct.id + 1, name: `Product ${newProduct.id + 1}` });
    //   };
      return (
        <div>
          <button
            className="btn btn-primary"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
          >
            Open Cart
          </button>
          <Cart cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} />
        </div>
      );
}

export default Home;