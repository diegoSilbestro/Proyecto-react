import React from 'react'


const Product = ({data, addToCart}) => {

const {id, nombre, precio}= data;

  return (
    <div className='product'>
        <h4>{nombre}</h4>
        <h5>{precio}</h5>
        <button onClick={() => addToCart(id)}>Agregar</button> 
    </div>
  )
}

export default Product