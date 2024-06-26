import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import path from "./Constant/path";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./pages/ProductList/ProductList";
import Home from "./pages/Home/home";
import Login from "./pages/Login/Login";
function App() {
  return (
    <Router>
      <Routes>
        <Route path={path.products} element={<ProductList />}></Route>
        <Route path={path.home} element={<Home />}></Route>
        <Route path={path.products} element={<ProductList />}></Route>
        <Route path={path.login} element={<Login />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
