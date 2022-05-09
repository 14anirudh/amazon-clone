import React from "react";
import "./CheckoutProduct.css";
import { useStateValue } from "./StateProvider";

function CheckoutProduct({ id,image, title, price, rating,hideButton}) {
  const[{basket},dispatch]=useStateValue();

  const removeFromBasket =()=>{
    //remove the item from basket 
    dispatch({
      type:'REMOVE_FROM_BASKET',
      id:id,
    })
  }
  return (
    <div className="checkoutProduct">
      <img  className="cp_image" src={image} alt="product image
      a" />

      <div className="cp_info">
        <p className="cp_title">{title}</p>
        <p className="cp_price">
          <small>$</small>
          <strong>{price}</strong>
        </p>

        <div className="cp_rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>🌟</p>
            ))}
        </div>
        {!hideButton &&(
        <button onClick={removeFromBasket}>Remove from Basket</button>
        )}
      </div>
    </div>
  );
}

export default CheckoutProduct;
