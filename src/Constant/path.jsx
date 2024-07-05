const path = {
    home: '/',
    login: '/login',
    checkout: '/checkout',
    product: '/product',
    productDetail: (id)=> `/products/${id}`,
    header: '/header',
    footer: '/footer',
    searchProducts: '/search',
    historyProducts: '/history',
    nopage:'/*', //page không tồn tại
    homeWithId: (id) => `/home/${id}` // Thêm path home:id

};

export default path;
