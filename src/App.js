import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import path from "./Constant/path";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./pages/ProductList/ProductList";
import Home from "./pages/Home/home";
import Login from "./pages/Login/Login";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import SearchProduct from "./pages/SearchProduct/SearchProduct";
import HistoryProduct from "./pages/HistoryProduct/HistoryProduct";
function App() {
  return (
    <Router>
      <Routes>
        <Route path={path.products} element={<ProductList />}></Route>
        <Route path={path.home} element={<Home />}></Route>
        <Route path={path.homeWithId(":id")} element={<Home />} />
        <Route path={path.products} element={<ProductList />}></Route>
        <Route path={path.login} element={<Login />}></Route>
        <Route path={path.header} element={<Header />}></Route>
        <Route path={path.footer} element={<Footer />}></Route>
        <Route path={path.searchProducts} element={<SearchProduct />}></Route>
        <Route path={path.historyProducts} element={<HistoryProduct />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
