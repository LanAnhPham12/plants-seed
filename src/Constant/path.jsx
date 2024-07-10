const path = {
    home: '/',
    login: '/login',
    checkout: '/checkout',
    products: '/products',
    productDetail: (id)=> `/products/${id}`,
    header: '/header',
    footer: '/footer',
    searchProducts: '/search',
    historyProducts: '/history',
    instruction: '/instruction',
    nopage:'*',
    homeWithId: (id) => `/home/${id}` // Thêm path home:id
};

export default path;
