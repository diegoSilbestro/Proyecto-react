
import ShoppingCart from './ShoppingCart';

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Inicio from './Header/Inicio';
import Tienda from './Tienda/Tienda'

const Rutas = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element= {<Inicio />} />
                <Route path="/Tienda" element= {<Tienda />} />
                <Route path="/ShoppingCart" element={<ShoppingCart/> } />
            </Routes>
            
        </Router>
    )
}
export default Rutas;
