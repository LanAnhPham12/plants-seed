const path = {
    products: '/products',
    login: '/login',
    header: '/header',
    footer: '/footer',
    home: '/',
    searchProducts: '/search',
    historyProducts: '/history',
    homeWithId: (id) => `/home/${id}`  // Thêm path home:id
};

export default path;
