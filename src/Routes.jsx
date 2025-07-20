import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/Home"
import ProductDetails from "./pages/ProductDetails"
import NotFoundPage from "./pages/NotFoundPage"
import axios from "axios";
import { useEffect, useState } from "react";

const RouteComponents = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}`)
            .then((response) => setProducts(response.data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <Routes>
            <Route path="/" element={<HomePage products={products} setProducts={setProducts} />} />
            <Route path="/product/:name" element={<ProductDetails products={products} />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}

export default RouteComponents