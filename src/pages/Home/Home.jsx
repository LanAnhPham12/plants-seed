import Cart from "../Cart/Cart";
import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from './home.module.css'
import { Link } from 'react-router-dom';
import Product from '../ProductList/Product/Product';
import productApi from '../../api/productApi';



function Home() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortByName, setSortByName] = useState(null);
  const [sortByPrice, setSortByPrice] = useState(null);

  useEffect(() => {
      const fetchProducts = async () => {
          try {
              console.log('Fetching products from API...');
              const response = await productApi.getAllProducts();
              console.log('Items from API:', response);
              if (Array.isArray(response) && response.length > 0) {
                  setProducts(response);
                  console.log('Products set successfully:', response);
              } else {
                  console.log('API response is not valid or empty:', response);
                  setProducts([]);
              }
          } catch (error) {
              console.error('Error fetching products:', error);
              // Handle error state or logging as needed
          }
      };

      fetchProducts();
  }, []);

  
  const currentProducts = products.find((item) => item.page === currentPage)?.jsonObject.collection.productVariants || [];

// Sắp xếp sản phẩm hiện tại theo tên hoặc giá
  const sortByNameAsc = (a, b) => a.product.title.localeCompare(b.product.title);
  const sortByNameDesc = (a, b) => b.product.title.localeCompare(a.product.title);
  const sortByPriceAsc = (a, b) => a.price.amount - b.price.amount;
  const sortByPriceDesc = (a, b) => b.price.amount - a.price.amount;

  let sortedProducts = [...currentProducts];

  if (sortByName) {
      sortedProducts.sort(sortByName === 'asc' ? sortByNameAsc : sortByNameDesc);
  } else if (sortByPrice) {
      sortedProducts.sort(sortByPrice === 'asc' ? sortByPriceAsc : sortByPriceDesc);
  }


      return (
        <div>
          <Header></Header>
          <div className={` ${styles.banner} position-relative d-flex justify-content-center align-items-center mt-5 pt-4`}>
                <div className="position-absolute text-center col-8 text-white f-s-18 f-f-Cardo-Semibold">
                    <div className="f-s-55 f-f-Cardo-Bold">
                    Khám phá bộ sưu tập hạt giống hữu cơ được chọn lọc kỹ càng nhất từ ​​vườn gia truyền cho Ốc đảo xanh của bạn!
                    </div>
                    Lấy cảm hứng từ Bộ sưu tập rau, thảo mộc, hoa, hạt kỳ lạ, hạt cọ và hạt tre tươi của chúng tôi!
                    
                    <div><button className={` ${styles.btnn} btn mt-5 f-f-Cardo-Bold`}>Xem thêm</button></div>
                </div>
            </div>

            <div className="box mt-5">
              <div className={`${styles.wrapper}`}>
                <div className="grid grid-spacer text-center d-flex justify-content-center" style={{gap: '200px'}}>
                  <div className="grid__item large--four-twelfths medium--four-twelfths">
                    <img style={{height: '100px'}} src="data:image/png;base64,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" alt="" />
                    <h3 className="h4 mt-3 f-f-Cardo-Bold">Vận chuyển toàn cầu</h3>
                  </div>
                  <div className="grid__item large--four-twelfths medium--four-twelfths">
                    <img style={{height: '100px'}} src="data:image/png;base64,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" alt="" />
                    <h3 className="h4 mt-3 f-f-Cardo-Bold">Free Shipping </h3>
                  </div>
                  <div className="grid__item large--four-twelfths medium--four-twelfths">
                    <img style={{height: '100px'}} src="data:image/png;base64,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" alt="" />
                    <h3 className="h4 mt-3 f-f-Cardo-Bold">Nhân viên hỗ trợ</h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="box" style={{marginTop: '150px'}}>
              <div className={`${styles.wrapper}`}>
                <div className="grid grid-spacer row">
                  <div className="col-6 grid__item large--twelfth-twelfths medium--twelfth-twelfths small--twelfth-twelfths">
                    <div className="text-center">
                      <h1 className="f-f-Cardo-Bold">Welcome to Garden Paradise Seeds  </h1>
                      <p className="f-f-Cardo-Bold" style={{color: '#046a38'}}>Unleash your gardening potential with our premium garden seeds. Immerse yourself in a world of possibilities and create your very own garden paradise.</p>
                      <h3 className="f-f-Cardo-Bold">Vegetable Seeds</h3>
                      <p className="f-f-Cardo-Bold" style={{color: '#046a38'}}>Unleash your gardening potential with our premium garden seeds. Immerse yourself in a world of possibilities and create your very own garden paradise.</p>
                      <h3 className="f-f-Cardo-Bold">Vegetable Seeds</h3>
                      <p className="f-f-Cardo-Bold" style={{color: '#046a38'}}>Unleash your gardening potential with our premium garden seeds. Immerse yourself in a world of possibilities and create your very own garden paradise.</p>
                      <h3 className="f-f-Cardo-Bold">Vegetable Seeds</h3>
                      <p className="f-f-Cardo-Bold" style={{color: '#046a38'}}>Unleash your gardening potential with our premium garden seeds. Immerse yourself in a world of possibilities and create your very own garden paradise.</p>
                      <h3 className="f-f-Cardo-Bold">Vegetable Seeds</h3>
                      <p className="f-f-Cardo-Bold" style={{color: '#046a38'}}>Unleash your gardening potential with our premium garden seeds. Immerse yourself in a world of possibilities and create your very own garden paradise.</p>
                    </div>
                  </div>
                  <div className="col-6 grid__item large--six-twelfths medium--six-twelfths small--twelfth-twelfths"> 
                  <div className="text-center">
                      <h1 className="f-f-Cardo-Bold">Why Choose Garden Paradise Seeds?                      </h1>
                      <p className="f-f-Cardo-Bold" style={{color: '#046a38'}}>Unleash your gardening potential with our premium garden seeds. Immerse yourself in a world of possibilities and create your very own garden paradise.</p>
                      <h3 className="f-f-Cardo-Bold">Your Gateway to a Green Oasis! Find the Best Garden Seeds Here</h3>
                      <p className="f-f-Cardo-Bold" style={{color: '#046a38'}}>At Garden Paradise Seeds, we understand that every gardener's dream is to witness their hard work blossom into a tapestry of colors and scents. That's why we source our seeds from reputable and trusted suppliers, ensuring that each seed is of superior quality and guaranteed to yield bountiful results. Whether you're an experienced gardener or just starting your green journey, our diverse seed collection caters to all preferences and skill levels</p>
                      <p className="f-f-Cardo-Bold" style={{color: '#046a38'}}>Successful gardening is not just about providing the best seeds but also about offering the best guidance. Our team of passionate horticulturists is dedicated to sharing their expertise, providing valuable tips, and assisting you in making informed choices. We are committed to ensuring your gardening experience is both enjoyable and rewarding.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="box" style={{marginTop: '150px'}}>
              <div className={`${styles.wrapper}`}>
                <div className="grid">
                  <div class="section-header"><h2 class="section-header__title text-center f-f-Cardo-Bold">Unearth the Magic Within Our Garden Seeds</h2></div>
                </div>
                <div className="row mt-5">
                  <div className="col-4">
                    <Link to="">
                      <div className={`${styles["img"]} position-relative`} style={{ backgroundImage: `url('https://www.gardenparadiseseeds.com/cdn/shop/collections/tropical-exotic-seeds-768892.jpg?v=1691375736')` }}>
                          <div className={`${styles["xxx"]} position-absolute text-center f-s-18 f-f-Cardo-Semibold text-white`}>
                          Vegetable
                            <div><button className={` ${styles.btnn} btn mt-2 f-f-Cardo-Bold`}>Shop now</button></div>                        
                          </div>

                      </div>
                    </Link>
                  </div>
                  <div className="col-4">
                    <Link to="">
                      <div className={`${styles["img"]} position-relative`} style={{ backgroundImage: `url('https://www.gardenparadiseseeds.com/cdn/shop/collections/vegetable-seeds-588104_900x.jpg?v=1691375773')` }}>
                          <div className={`${styles["xxx"]} position-absolute text-center f-s-18 f-f-Cardo-Semibold text-white`} >
                          Palm and BamBook seeds
                            <div><button className={` ${styles.btnn} btn mt-2 f-f-Cardo-Bold`}>Shop now</button></div>                        
                          </div>

                      </div>
                    </Link>
                  </div>
                  <div className="col-4">
                    <Link to="">
                      <div className={`${styles["img"]} position-relative`} style={{ backgroundImage: `url('https://www.gardenparadiseseeds.com/cdn/shop/collections/tropical-exotic-seeds-768892.jpg?v=1691375736')` }}>
                          <div className={`${styles["xxx"]} position-absolute text-center f-s-18 f-f-Cardo-Semibold text-white`}>
                          Flower Seeds
                            <div><button className={` ${styles.btnn} btn mt-2 f-f-Cardo-Bold`}>Shop now</button></div>                        
                          </div>

                      </div>
                    </Link>
                  </div>
                </div>
                <Link to="">
                      <div className={`${styles["img"]} position-relative`} style={{ backgroundImage: `url('https://www.gardenparadiseseeds.com/cdn/shop/collections/mixed-sort-of-seeds-676687.jpg?v=1691375741')` }}>
                          <div className={`${styles["xxx"]} position-absolute text-center f-s-18 f-f-Cardo-Semibold text-white`} >
                          Flower Seeds
                            <div><button className={` ${styles.btnn} btn mt-2 f-f-Cardo-Bold`}>Shop now</button></div>                        
                          </div>

                      </div>
                    </Link>
              </div>
            </div>

            <div className="box" style={{marginTop: '50px'}}>
              <div className={`${styles.wrapper} d-flex justify-content-center`}>
              <iframe width="560" height="315" src="https://www.youtube.com/embed/k8g64zMJRA0?rel=0&showinfo=0&vq=720" frameborder="0" allowfullscreen></iframe>
              </div>

            </div>

            <div className="box" style={{marginTop: '50px'}}>
            <h1 className="f-f-Cardo-Bold text-center mb-5">Start to grow your gardening practice with us</h1>

              <div className={`${styles.wrapper} d-flex justify-content-center`}>
              <div className="row row-cols-4 px-5 g-4 gy-5">
                    {sortedProducts.length > 0 ? (
                        sortedProducts.map((product, index) => (
                            <Product key={index} dataProduct={product} />
                        ))
                    ) : (
                        <div>No products found</div>
                    )}
                </div>
                  </div>

            </div>
          <Footer></Footer>
        </div>
      );
}

export default Home;