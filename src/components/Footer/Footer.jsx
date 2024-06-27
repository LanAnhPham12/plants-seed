import { Link } from 'react-router-dom';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faEnvelope, faPhone, faPrint } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faGoogle, faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

function Footer() {
    return ( 
        <footer class="text-center text-lg-start text-white mt-5" style={{backgroundColor: '#046a38'}} >
              <section class="d-flex justify-content-center p-4 border-bottom">
                <div class="me-5 d-none d-lg-block">
                    <span>Theo dõi chúng tôi trên các trang mạng xã hội:</span>
                </div>
                <div>
                <a href="" className="me-4 text-reset">
                    <FontAwesomeIcon icon={faFacebookF} />
                </a>
                <a href="" className="me-4 text-reset">
                    <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a href="" className="me-4 text-reset">
                    <FontAwesomeIcon icon={faGoogle} />
                </a>
                <a href="" className="me-4 text-reset">
                    <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href="" className="me-4 text-reset">
                    <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a href="" className="me-4 text-reset">
                    <FontAwesomeIcon icon={faGithub} />
                </a>
                </div>
            </section>
          <section class="border-bottom">
            <div class="container text-center text-md-start mt-5">
              <div class="row pt-4">
                <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                  <h6 class="text-uppercase fw-bold mb-4">
                   Company name
                  </h6>
                  <p>   
                    Here you can use rows and columns to organize your footer content. Lorem ipsum
                    dolor sit amet, consectetur adipisicing elit.
                  </p>
                </div>
        
                <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                  <h6 class="text-uppercase fw-bold mb-4">
                    Sản phẩm
                  </h6>
                  <p>
                    <Link to="" class="text-reset text-decoration-none">Hạt giống</Link>
                  </p>
                  <p>
                    <Link to="" class="text-reset text-decoration-none">Thủy sinh</Link>
                  </p>
                  <p>
                    <Link to="" class="text-reset text-decoration-none">Chậu cây</Link>
                  </p>
                  <p>
                    <Link to="" class="text-reset text-decoration-none">Cây ăn quả</Link>
                  </p>
                </div>
        
                <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                  <h6 class="text-uppercase fw-bold mb-4">
                  Thông tin
                  </h6>
                  <p>
                    <a href="#!" class="text-reset text-decoration-none">Chính sách</a>
                  </p>
                  <p>
                    <a href="#!" class="text-reset text-decoration-none">Thông báo pháp lý</a>
                  </p>
                  <p>
                    <a href="#!" class="text-reset text-decoration-none">Giao hàng</a>
                  </p>
                  <p>
                    <a href="#!" class="text-reset text-decoration-none">Trợ giúp</a>
                  </p>
                </div>
        
                <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Liên hệ</h6>
                    <p>
                        <FontAwesomeIcon icon={faHome} className="me-3" />
                        New York, NY 10012, US
                    </p>
                    <p>
                        <FontAwesomeIcon icon={faEnvelope} className="me-3" />
                        info@example.com
                    </p>
                    <p>
                        <FontAwesomeIcon icon={faPhone} className="me-3" />
                        + 01 234 567 88
                    </p>
                    <p>
                        <FontAwesomeIcon icon={faPrint} className="me-3" />
                        + 01 234 567 89
                    </p>
                </div>
              </div>
            </div>
          </section>
          <div class="text-center p-4">© 2021 Copyright: HongHoaibao and NguyenLanAnh
            </div>
        </footer>
         );
}

export default Footer;