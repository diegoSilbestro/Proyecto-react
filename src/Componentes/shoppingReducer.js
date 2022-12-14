import { TYPES } from './Actions/shoppingActions'
import axios from 'axios';

export const shoppingInitialState = {

  productos: [],
  cart: [],
}

let options = {},
  cartUpdate = {};
let method;
let endpoint;

export function shoppingReducer(state, action) {
  switch (action.type) {

    case TYPES.READ_STATE: {
      return {
        ...state,
        productos: action.payload[0],
        cart: action.payload[1]
      }
    }



    case TYPES.ADD_TO_CART: {
      let newItem = state.productos.find(productos => productos.id === action.payload)

      let itemInCart = state.cart.find(item => item.id === newItem.id)

      if (itemInCart){
        method= 'PUT';
        endpoint= `http://localhost:5000/cart/${itemInCart.id}`;
        cartUpdate= { ...itemInCart, cantidad: itemInCart.cantidad + 1 }
                   
      }
      else {
        method= 'POST';
        endpoint= 'http://localhost:5000/cart';
        cartUpdate= { ...newItem, cantidad: 1 }
      }

      options={
        method: method,
        headers: { "content-type": "application/json" },
        data: JSON.stringify(cartUpdate)
      }
      
      const updateCart = async () => {await axios (endpoint, options)}

      updateCart ();

      return itemInCart

        ? {
          ...state,
          cart: state.cart.map(item =>
            item.id === newItem.id
              ? { ...item, cantidad: item.cantidad + 1 }
              : { ...item }
          ),
          cartUpdate: { ...itemInCart, cantidad: itemInCart.cantidad + 1 }

        }
        : {
          ...state,
          cart: [...state.cart, { ...newItem, cantidad: 1 }],
          cartUpdate: { ...newItem, cantidad: 1 }
        }

    }


    case TYPES.REMOVE_ONE_PRODUCT: {
      let itemToDelete = state.cart.find(item => item.id === action.payload)

      if (itemToDelete.cantidad > 1) {
          method = "PUT";
          endpoint = `http://localhost:5000/cart/${itemToDelete.id}`;
          cartUpdate = { ...itemToDelete, cantidad: itemToDelete.cantidad - 1 };
      } else {
          method = "DELETE";
          endpoint = `http://localhost:5000/cart/${itemToDelete.id}`;
      } 
      
      options = {
        method: method,
        headers: { "content-type": "application/json" },
        data: JSON.stringify(cartUpdate)
      };

      const updateCart = async () => {await axios (endpoint, options)}

      updateCart ();



      return itemToDelete.cantidad > 1
        ? {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload
              ? { ...item, cantidad: item.cantidad - 1 }
              : item
          ),
          method: "PUT",
          endpoint: `http://localhost:5000/cart/${itemToDelete.id}`,
          cartUpdate: { ...itemToDelete, cantidad: itemToDelete.cantidad - 1 }
        }
        : {
          ...state,
          cart: state.cart.filter(item => item.id !== action.payload),
          method: "DELETE",
          endpoint: `http://localhost:5000/cart/${itemToDelete.id}`
        }

    }

    case TYPES.REMOVE_ALL_PRODUCTS: {


      options = {
        method: 'DELETE',
        headers: { "content-type": "application/json" }
      };

      endpoint= `http://localhost:5000/cart/${action.payload}`

      const updateCart = async () => {await axios (endpoint, options)}

      updateCart ();

      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
        method: "DELETE"
      }
    }

    case TYPES.CLEAN_CART: {
      return {
        ...state,
        cart: [],

      }

    }

    default:
      return state;
  }

}