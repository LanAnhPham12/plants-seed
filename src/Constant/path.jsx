const path = {
    home: '/',
    login: '/login',
    products: '/products',
    productDetail: (id)=> `/products/${id}`,
    header: '/header',
    footer: '/footer',
    searchProducts: '/search',
    historyProducts: '/history',
    homeWithId: (id) => `/home/${id}` // Thêm path home:id
};

export default path;
