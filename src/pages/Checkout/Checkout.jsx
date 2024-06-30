import styles from './checkout.module.css'
import Product from './Product/Product';
function Checkout() {
    return ( 
        <div>
                <div className={`${styles.box}`}>
                    <div className='row container m-auto'>
                            <div className='col-7 pt-5'>
                                <div className='w-75 m-auto'>
                                    <label className='mb-3 f-f-Cardo-Bold' htmlFor="">Email liên hệ</label> 
                                    <input className='w-100' type="email" placeholder='Email'/>  
                                    <label className='mb-3 f-f-Cardo-Bold mt-5' htmlFor="">Thông tin nhận hàng</label> 
                                    <input className='w-100' type="text" placeholder='Số điện thoại'/>
                                    <div className='row mt-3 d-flex justify-content-around'>
                                    <input placeholder='Họ' className='col-5 me-3' type="text" />
                                    <input placeholder='Tên' className='col-5 ms-3' type="text" />
                                    </div>  
                                    <input className='w-100 mt-3' type="text" placeholder='Tỉnh'/>
                                    <input className='w-100 mt-3' type="text" placeholder='Huyện'/>
                                    <input className='w-100 mt-3' type="text" placeholder='Xã'/>
                                    <input className='w-100 mt-3' type="text" placeholder='Đia chỉ cụ thể'/>
                                    <label className='mb-3 f-f-Cardo-Bold mt-5' htmlFor="">Ghi chú</label> 
                                    <textarea className='w-100 mb-5' rows={4} name="" id=""></textarea>

                                </div>

                            </div>
                            <div className="col-5 border-left border-start pt-5" style={{backgroundColor: '#f5f5f5'}}>
                            <div className='w-100 m-auto'>
                                <Product></Product>
                                <div className='border-bottom mt-4'></div>
                                <div className='mt-4 d-flex justify-content-between'>
                                    <input placeholder='Mã giảm giá' style={{width: '65%'}} className='ms-3' type="text" />
                                    <button className="btn f-f-Cardo-Bold me-4" style={{   backgroundColor: '#068647', borderColor: '#068647', color: '#fff', padding: '8px 15px'}}>Lưu</button>
                                </div>
                                <div className='border-bottom mt-4'></div>
                                <div className='d-flex justify-content-between mt-5'>
                                    <h5 className='ms-3 f-f-Cardo-Bold'>Total</h5>
                                    <h4 className='me-3 f-f-Cardo-Bold'>20000 vnđ</h4>
                                </div>
                                <button className="btn f-f-Cardo-Bold me-4 mt-4" style={{ float:'right' ,backgroundColor: '#068647', borderColor: '#068647', color: '#fff', padding: '8px 15px'}}>Xác nhận đặt hàng</button>
                            </div>
                            </div>
                    </div>
                </div>
        </div>
     );
}

export default Checkout;