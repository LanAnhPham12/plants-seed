import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import path from "./Constant/path";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./pages/ProductList/ProductList";
function App() {
  return (
    <Router>
      <Routes>
        <Route path={path.products} element={<ProductList />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
