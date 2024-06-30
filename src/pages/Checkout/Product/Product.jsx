function Checkout() {
    return ( 
        <div className="d-flex">
            <div className="d-flex align-items-center ms-3" style={{width: '64px', height: '60px', backgroundColor:'#fff', borderRadius: '4px', border: '1px solid #ccc'}}>
                <img style={{width: '64px', height: '38px', padding: '1px'}} src="https://cdn.shopify.com/s/files/1/0518/4552/9775/products/buy_plant_online_Hot_Carolina_Reaper_Pepper_Seeds_small.jpg?v=1691399076" alt="" />
            </div>
            <span style={{backgroundColor: '#7f7f7f', height: '18px', width: '18px', borderRadius: '100%', display: 'flex', justifyContent: 'center', alignItems:'center', marginLeft: '-7px', color:'#fff', fontSize: '12px', marginTop: '-8px'}}>2</span>
            <div className="m-auto ms-0">
                <div style={{fontSize: '14px'}}>Hot Carolina Reaper Pepper Seeds</div>
                <div style={{fontSize: '12px', opacity: '0.8'}}>20 Seeds</div>
            </div>
            <div className="m-auto f-s-15">20000 vnđ</div>
        </div>
    );
}

export default Checkout;