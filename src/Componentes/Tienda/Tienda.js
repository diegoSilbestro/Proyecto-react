import React, { useEffect} from 'react'
import { TYPES } from '../Actions/shoppingActions'
import { shoppingReducer, shoppingInitialState } from '../shoppingReducer'
import { useReducer } from 'react'
import ElementoTienda from './ElementoTienda'
import Header from '../Header/Header';
import "../styles/Tienda.css"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios"


const Tienda = () => {

    const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState);

    const { productos, cart} = state;

    const updateState = async () => {
        const productsURL = "http://localhost:5000/productos";
        const cartURL = "http://localhost:5000/cart";
        const resProducts = await axios.get(productsURL);
        const resCart = await axios.get(cartURL);
        const newProduct = await resProducts.data
        const newCartItem = await resCart.data

        dispatch({ type: TYPES.READ_STATE, payload: [newProduct, newCartItem] })
    }
    useEffect(() => {
        updateState();
    }, [cart])

    const addToCart = (id) => dispatch({ type: TYPES.ADD_TO_CART, payload: id })

    let cartItemQuantity = 0;
    cart.map(item => (cartItemQuantity = item.cantidad + cartItemQuantity));
    

    return (
        <>
            <div  >
                <Header cartItemQuantity={cartItemQuantity} />
            </div><hr /><hr /><hr /><hr /><hr />
            <Container>
                <h1 id='TiendaSinTACC'>Tienda Sin TACC</h1>
                <Row>
                    {
                        productos.map(productos => {
                            if (productos.category === "Sin TACC") {
                                return (
                                    <>
                                        <Col lg={4} md={6} sm={12}>
                                            <ElementoTienda key={productos.id} data={productos} addToCart={addToCart} />
                                        </Col>
                                    </>
                                )
                            }
                        })
                    }
                </Row>
                <h1 id='TiendaSinAzucar'>Tienda Sin Az??car</h1>
                <Row>
                    {
                        productos.map(productos => {
                            if (productos.category === "Sin Az??car") {
                                return (
                                    <>
                                        <Col lg={4} md={6} sm={12}>
                                            <ElementoTienda key={productos.id} data={productos} addToCart={addToCart} />
                                        </Col>
                                    </>
                                )
                            }
                        })
                    }
                </Row>
                <h1 id='TiendaTradicional'>Tienda Tradicional</h1>
                <Row>
                    {
                        productos.map(productos => {
                            if (productos.category === "Tradicional") {
                                return (
                                    <>
                                        <Col lg={4} md={6} sm={12}>
                                            <ElementoTienda key={productos.id} data={productos} addToCart={addToCart} />
                                        </Col>
                                    </>
                                )
                            }
                        })
                    }
                </Row>
            </Container>

        </>

    )

}

export default Tienda
